<script setup>
import { ref, reactive, toRaw, watch, computed, onMounted } from 'vue'
import { $http, $numeral } from '@/plugins'
import {
  // CommonModel,
  LineasProductosModel, AlmacenesModel, StockModel, StockExcelModel
} from '@/models'
import { useRoute } from 'vue-router'

import renderDescripcion from './components/renderDescripcion.vue'
import renderCantidadConsignacion from './components/renderCantidadConsignacion.vue'
import cmp_lineas from './components/dialogo_lineas_productos'
import dialogo_stock from './components/dialogo_stock.vue'
import { AgToggleButton } from 'ag-grid-community'

const route = useRoute()
const base = route.params.base
const agencia = route.params.agencia
const usuario = route.params.usuario

// console.log(base);
// console.log(agencia);
// console.log(usuario);

// const m_common = new CommonModel()
const m_lineas_produtos = new LineasProductosModel()
const m_almacenes = new AlmacenesModel()
const m_stock = new StockModel()
const m_stock_excel = new StockExcelModel()

const componenteLineas = ref()

const gridApi = ref(null)
const filtro = ref('')
const diag_stock = ref()

const isLoading = ref(false)
const txtBuscar = ref()
const error = ref(false)

const lineas = ref([])

const busqueda = reactive({
  q: '',
  base,
  todo: false,
  ceros: false,
  transito: false,
  lineas: []
})

const readyTabla = params => {
  gridApi.value = params.api
  listar_almacenes()
}

const data = ref([])
const no_usar = ref(false)

async function listar_almacenes() {
  let params = { base, agencia }

  isLoading.value = true

  let res = await m_almacenes.listar(params)

  if (res.length == 0) {
    isLoading.value = false
    no_usar.value = true
    return
  }

  let almacenes = res.almacenes
  let precio = res.precio
  let adicionales = res.adicionales

  let columnDefs = [

    {
      field: 'producto_codigo',
      headerName: 'Código',
      tipo: 'codigo',
      excel: true,
      width: 100,
      grupo: "dato",
      cellClass: ['justify-center', 'text-caption']
    },
    {
      field: 'producto_descripcion',
      headerName: 'Producto',
      tipo: 'descripcion',
      minWidth: 200,
      excel: true,
      grupo: "dato",
      flex: 1,
      cellRenderer: renderDescripcion,
      cellRendererParams: params => {
        return {
          filtro: filtro.value,
          clicked: params => diag_stock.value.mostrar({ base, agencia, params })
        }
      },
      cellStyle: { display: 'inline-block' }
    },
    { field: 'cod_linea', headerName: 'Linea_codigo', tipo: 'linea', hide: true, grupo: "dato", excel: false },
  ]

  adicionales.forEach(item => {
    columnDefs.push({
      field: item.id,
      tipo: item.tipo,
      hide: item.hide,
      excel: item.excel,
      grupo: item.grupo,
      headerName: item.titulo,
      width: item.width ? item.width : 65,
      // type: 'stock',
      // cellClass: () => {
      //   let tipo = ""
      //   if (item.tipo == "S") tipo = "separacion"
      //   if (item.tipo == "C") tipo = "consignacion"
      //   if (item.tipo == "T") tipo = "transito"
      //   return tipo
      // },
    })
  })

  columnDefs.push({
    field: precio.id,
    tipo: "precio",
    headerName: precio.titulo,
    width: precio.width ? precio.width : 75,
    type: 'precio',
    grupo: 'precio',
    excel: true,
    cellClass: ['precio'],
  })

  almacenes.forEach(item => {
    let render = undefined
    let renderParams = undefined

    if (item.tipo == "C") {
      render = renderCantidadConsignacion

      renderParams = (params) => {
        return {
          detalles: (params) => {
            diag_stock.value.mostrar({ base, agencia, params, tipo: 'C' })
          }
        }
      }
    }

    columnDefs.push({
      field: 'A' + item.id,
      tipo: item.tipo,
      excel: item.excel,
      grupo: item.grupo,
      headerName: item.titulo,
      width: item.width ? item.width : 65,
      type: 'stock',
      cellRenderer: render,
      cellRendererParams: renderParams,
      cellClass: () => {
        let tipo = ""
        if (item.tipo == "S") tipo = "separacion"
        if (item.tipo == "C") tipo = "consignacion"
        if (item.tipo == "T") tipo = "transito"
        return tipo
      },
    })
  })

  gridApi.value.setGridOption('columnDefs', columnDefs)
  isLoading.value = false
}

async function buscar() {

  setTimeout(function () { filtro.value = '' }, 0)

  let columnas = gridApi.value.getGridOption('columnDefs')

  error.value = false
  if (!busqueda.todo && busqueda.q.trim().length <= 2) {
    error.value = true
    return
  }

  txtBuscar.value.blur()
  isLoading.value = true

  gridApi.value.setGridOption('rowData', [])
  gridApi.value.showLoadingOverlay()

  let params = busqueda
  params.almacenes = columnas.map(item => {
    return { field: item.field, headerName: item.headerName, tipo: item.tipo, grupo: item.grupo, excel: item.excel }
  })

  // data.value = await $http.post(`${api}/stock`, params).then(r => r.data)
  data.value = await m_stock.buscar(params)

  gridApi.value.hideOverlay()
  isLoading.value = false
}

watch(filtro, async (newQuestion, _) => {
  gridApi.value.setGridOption('quickFilterText', newQuestion)
  gridApi.value.redrawRows()
})

async function exportar_excel() {

  let busqueda_raw = toRaw({ ...busqueda })

  let almacenes_raw = ""
  let lineas_raw = ""
  if (busqueda_raw.almacenes.length > 0) almacenes_raw = busqueda_raw.almacenes.map(item => item.field).join(',')
  if (busqueda_raw.lineas.length > 0) lineas_raw = busqueda_raw.lineas.join(',')

  busqueda_raw.almacenes = almacenes_raw
  busqueda_raw.lineas = lineas_raw
  busqueda_raw.filtro = filtro.value

  busqueda_raw.filas_total = data.value.length
  busqueda_raw.filas_export = gridApi.value.getDisplayedRowCount()

  let tmp = Object.keys(busqueda_raw).map((field) => {
    return `${field}: ${busqueda_raw[field]}`
  })

  let params_descargas = {
    opciones: tmp.join('; '),
    usuario
  }

  // console.log(params_descargas);
  // await m_common.guardar_descargas(params_descargas)
  // return

  let cols = gridApi.value.getGridOption('columnDefs')
  let columnas = cols.map(item => {
    return { field: item.field, headerName: item.headerName, tipo: item.tipo, excel: item.excel, grupo: item.grupo }
  })

  isLoading.value = true
  let csv = gridApi.value.getDataAsCsv({
    skipColumnHeaders: true,
    suppressQuotes: true,
    columnSeparator: '|',
    allColumns: true
  })

  let params = { columnas, csv, params_descargas }

  // let res = await $http.post(`${api_excel}`, params, { responseType: 'blob' }).then(r => r.data)
  let res = await m_stock_excel.excel(params)

  if (res.size == 0) {
    console.log('Sin informacion para exportar');
    isLoading.value = false
    return
  }

  var url = window.URL.createObjectURL(new Blob([res]))
  const link = document.createElement('a')
  link.href = url
  link.setAttribute('download', 'reporte_consolidado.xlsx')
  document.body.append(link)
  link.click()
  link.remove()
  window.URL.revokeObjectURL(url)

  setTimeout(() => {
    // $eventBus.emit('blocking', false)
    isLoading.value = false
  }, 1500)

}

const habilitaExcel = ref(false)
function onRowDataUpdated() {
  if (gridApi.value) {
    habilitaExcel.value = gridApi.value.getDisplayedRowCount() == 0 ? false : true
  } else {
    habilitaExcel.value = false
  }
}

const tour = ref()

const optionsVueTour = {
  buttonLabels: {
    next: "Siguiente",
    prev: "Atrás",
    finish: "Finalizar",
    skip: "Omitir"
  }
}

const steps = [
  {
    target: '[data-step="1"]',
    content: `
      <b>Cajón de Búsqueda</b><br>
      Puede escribir una parte de la <u>descripción</u> del producto o el <u>código</u> para realizar la busqueda.<br>
      👉 Recuerde que debe escribir al menos 3 letras.`,
  },
  {
    target: '[data-step="2"]',
    content: `
      <b>Opción: Todo</b><br>
      Si está seleccionada, se mostrarán todos los productos de las <u>lineas de productos</u> que se encuentren seleccionadas.<br>
      ⚠️ Esta opción puede causar demora.
    `,
  },
  {
    target: '[data-step="3"]',
    content: `
      <b>Lineas de productos</b><br>
      Puede ser seleccionar una o varias linea de productos para la búsqueda del stock.
    `,
  },
  {
    target: '[data-step="4"]',
    content: `
      <b>Opción: Mostrar tránsito</b><br>
      Si esta seleccionada, se realiza la consulta de las <u>guias de remisión</u> con destino a la agencia actual.<br>
      El resultado se muestra en la columna <b>Tránsito</b>, para más información puede hacer click en la cantidad.<br>
      ⚠️ Esta opción puede causar demora.
    `,
  },
  {
    target: '[data-step="5"]',
    content: `
      <b>Opción: Mostrar con CEROS</b><br>
      Si esta seleccionada, se buscará tanto los productos con y sin stock.<br>
      ⚠️ Esta opción puede causar demora.
    `,
  },
  {
    target: '[data-step="6"]',
    content: `
      <b>Botón: Buscar stock</b><br>
      Ejecuta la búsqueda de stock, con los parámetros establecidos, los resultados se mostrarán en la tabla inferior. 
    `,
  },
  {
    target: '[data-step="8"]',
    content: `
      <b>Cajón de Fitrar resultados</b><br>
      Realiza el filtro de los resultados mostrados en pantalla
    `,
  },
  {
    target: '[data-step="9"]',
    content: `
      <b>Boton: Descargar en Excel</b><br>
      Nos permite descargar en formato .xlsx (Excel), el resultado mostrado en pantalla.<br>
      👉 Se ha establecido el límite del stock, controlando el mínimo y máximo de las cantidades a exportar (Desarrollo Comercial)
    `,
  },
]

function ayuda() {
  localStorage.removeItem("vjt-default");
  tour.value.startTour();
  tour.value.resetTour();
}

onMounted(async () => {
  // console.log($tours);
  // $tours['myTour'].start()

  lineas.value = await m_lineas_produtos.listar('JCHS2024')
  componenteLineas.value.llenar(lineas.value)
  componenteLineas.value.marcarGrupo("NEUMATICOS")

  const gridOptions = {
    rowData: [],
    columnDefs: [],
    animateRows: false,
    // enableRangeSelection: true,
    suppressContextMenu: true,
    headerHeight: 40,
    components: {
      // agColumnHeader: CustomHeader,
    },

    defaultColDef: {
      editable: false,
      suppressMovable: true,
      suppressMenu: true,
      resizable: false
      // comparator: (a, b) => (parseFloat(a) == parseFloat(b) ? 0 : parseFloat(a) > parseFloat(b) ? 1 : -1)
    }
  }
})
</script>

<template lang="pug">
v-container(fluid)
  v-dialog(v-model="no_usar" width="330" persistent)
    v-card.pa-3
      v-card-text.px-5
        div.gap-8.flex-column.align-center.text-center
          v-icon(size="40" color="grey-lighten-2") mdi-alert-circle
          span.text-h4.font-weight-bold(style="line-height: 20px !important") La agencia <u>{{ agencia }}</u><br>aún no esta configurada
          span.text-h6 Comuníquese con el Área de Sistemas 

  VTour(ref="tour" :steps="steps" autoStart :buttonLabels="optionsVueTour.buttonLabels" highlight)

  v-row(dense align="center")
    v-col(cols="3")
      dialogo_stock(ref="diag_stock")
      div.gap-10.align-center
        v-text-field(
          data-step="1"
          v-model="busqueda.q" ref="txtBuscar" 
          placeholder="Escribe al menos 3 letras" 
          persistent-placeholder 
          label="Buscar por código o descripción" @keyup.enter="buscar()" variant="filled"
          :error-messages="error ? 'err' : ''"
          hide-details
          :disabled="busqueda.todo")
        div.w90
          v-checkbox(data-step="2" label="Todo (*)" v-model="busqueda.todo")

    v-col.px-2(cols="2")
      cmp_lineas(data-step="3" ref="componenteLineas" :lineas="lineas" v-model="busqueda.lineas")

    v-col.px-2
      v-checkbox(data-step="4" label="Mostrar tránsito (*)" v-model="busqueda.transito")
      v-checkbox(data-step="5" label="Stock con CEROS (*)" v-model="busqueda.ceros")
    v-spacer
    v-col.gap-10.align-center(cols="3")
      v-btn(@click="ayuda()" variant="tonal" prepend-icon="mdi-help mdi-14px" rounded) Guia de uso
      v-btn.mx-auto.px-7(data-step="6" :loading='isLoading' @click='buscar()' color='amber' height='40' rounded stacked)
        template(v-slot)
          div.gap-10
            span.text-h5 Buscar stock
            v-icon(size='14') mdi-flash

  v-row(dense)
    v-col
      agGrid(
        data-step="7"
        :onFilterChanged="onRowDataUpdated"
        :onRowDataUpdated="onRowDataUpdated"
        :suppressContextMenu='true'

        :suppressRowClickSelection='false'
        :suppressCopyRowsToClipboard="true"
        :suppressPropertyNamesCheck="true" 
        :data='data'
        :filtro="filtro"
        :headerHeight="36"
        @grid-ready='readyTabla'
        rowSelection='multiple'
        style='width: 100%; height: calc(100vh - 155px)')

    //- v-col(cols="2" style="overflow-y:auto; height: 400px")
      pre.text-caption {{busqueda}}

  v-row(dense align="center")
    v-col(cols="2")
      v-filtro-input(data-step="8" v-model="filtro" placeholder="Filtrar resultados..")
      //- v-text-field(type="search" placeholder="Filtrar resultados.." variant="outlined" rounded density="compact" clearable bg-color="amber-lighten-4" v-model="filtro")
    v-col.px-8(cols="4")
      p.text-caption(style="line-height: 16px !important") * Las opciones de TODO, MOSTRAR TRÁNSITO y STOCK CON CEROS pueden provocar que los resultados se muestren con demora.
    v-spacer

    v-col.gap-4.text-h6(cols="2")
      span Resultados: 
      span.font-weight-bold.text-blue-darken-4 {{ data.length }}

    v-col.gap-0.flex-column(cols="2")
      div.w160
        v-btn.mx-auto.px-7(data-step="9" :loading='isLoading' @click='exportar_excel()' color='green' height='44' rounded :disabled="!habilitaExcel")
          template(v-slot)
            div.gap-10.align-center
              div.gap-2.flex-column
                span.text-h5 Descargar en Excel
                span.text-caption con <u>stock controlado</u>
              v-icon(size='20') mdi-download
      
</template>

<style>
.precio {
  background-color: rgb(255 238 0 / 0.1)
}

.separacion {
  background-color: rgb(255 145 0 / 0.1)
}

.consignacion {
  background-color: rgb(0 255 34 / 0.1)
}

.transito {
  background-color: rgb(0 140 255 / 0.1)
}
</style>