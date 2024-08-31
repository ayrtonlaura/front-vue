<script>
export default { name: 'comex-reportes-tracking' }
</script>

<script setup>
import { ref, watch, onMounted } from 'vue'
import { $http, $moment, $swal } from '@/plugins'

import { MarcaModel, LineasProductosModel } from '@/models'

// import TituloVista from '@/components/material/TituloVista.vue'
import Toast from '@/components/material/Toast.vue'
import ToastDownload from '@/components/material/ToastDownload.vue'

// const sesion = ref($auth.getUserLogged())

// const marca = ref('DUN')
// const resultado = ref({})
const searchText = ref('')
const con_pedidos = ref(false)

const marcas = ref([])
const lineas = ref([])

// const busqueda = ref({ marca: ['DUN', 'WES'] })

const columnas = ref([
  { headerName: 'producto_codigo', field: 'id', hide: true },
  { headerName: 'Marca', field: 'descripcion', flex: 1, checkboxSelection: true }
])

const columnas_lineas = [{ field: 'linea_grupo', rowGroup: true, hide: true }]

const autoGroupColumnDef = ref({
  headerName: 'Lineas de productos',
  field: 'descripcion',
  flex: 1,
  cellRenderer: 'agGroupCellRenderer',
  cellRendererParams: {
    checkbox: true
  }
})

const loadingGlobal = ref(false)
const pasos = ref([
  { titulo: 'Listado de productos', loading: false, ruta: 'Comex/Reportes/Tracking/productos_por_marca', documentos: 0, total: 0 },
  { titulo: 'Listado de pedidos', loading: false, ruta: 'Comex/Reportes/Tracking/pedidos_por_marca', documentos: 0, total: 0 },
  { titulo: 'Listado de proformas', loading: false, ruta: 'Comex/Reportes/Tracking/proformas_por_marca', documentos: 0, total: 0 },
  { titulo: 'Listado de invoices', loading: false, ruta: 'Comex/Reportes/Tracking/invoices_por_marca', documentos: 0, total: 0 }
])

const productos = ref([])
const pedidos = ref([])
const proformas = ref([])
const invoices = ref([])

const mensaje = ref('')
const archivo = ref('')
const show_downloaded = ref(false)

async function ejecutarReporte() {
  let seleccionados = gridMarca.value.getSelectedRows()
  let lineas_seleccionados = gridLinea.value.getSelectedRows()

  let marca = seleccionados.map(item => item.id)
  let lineas = lineas_seleccionados.map(item => item.linea_codigo)

  if (marca.length == 0) {
    $swal.fire('Sin marca seleccionada', 'Debe elegir al menos una marca para continuar', 'warning')
    return
  }

  if (lineas.length == 0) {
    $swal.fire('Sin lineas de productos seleccionadas', 'Debe elegir al menos una linea para continuar', 'warning')
    return
  }

  pasos.value.forEach(i => {
    i.documentos = 0
    i.total = 0
  })

  loadingGlobal.value = true

  for (let index = 0; index < pasos.value.length; index++) {
    const item = pasos.value[index]

    mensaje.value = item.titulo

    item.loading = true
    let res = await $http
      .get(item.ruta, {
        params: {
          usuario: 'LMVN',
          base: 'JCHS2024',
          // usuario: sesion.value.usuario_alias,
          // base: sesion.value.base_comercial,
          marca,
          lineas,
          empresa: 'JCH' //sesion.value.empresa_abrev
        }
      })
      .then(r => r.data)
      .catch(e => console.log(e.toJSON()))

    switch (index) {
      case 0:
        productos.value = res
        break
      case 1:
        pedidos.value = res
        break
      case 2:
        proformas.value = res
        break
      case 3:
        invoices.value = res
        break
    }
    item.total = res.total
    item.documentos = res.documentos
    item.loading = false
  }

  loadingGlobal.value = false
}

async function enviarExcel() {
  if (productos.value.total == 0) {
    $swal.fire('No hay productos', 'La consulta no tiene productos para preparar el reporte', 'warning')
    return
  }

  mensaje.value = 'Exportando a Excel'

  loadingGlobal.value = true
  await $http
    .get('Comex/Reportes/TrackingExcel', {
      responseType: 'blob',
      params: {
        con_pedidos: con_pedidos.value,
        usuario: 'LMVN' // sesion.value.usuario_alias
        // base: 'JCHS2024',
        // marca,
        // empresa: 'JCH',
        // productos: productos.value,
        // proformas: proformas.value,
        // invoices: invoices.value
      }
    })
    .then(async response => {
      var url
      if (!window.__TAURI__) {
        // Yeah working in browser!!
        url = window.URL.createObjectURL(new Blob([response.data]))
        const link = document.createElement('a')
        link.href = url
        link.setAttribute('download', 'reporte.xlsx')
        document.body.append(link)
        link.click()
        link.remove()
        window.URL.revokeObjectURL(url)
      } else {
        // Tauri🤘

        let seleccionados = gridMarca.value.getSelectedRows()

        let marcas = []
        seleccionados.reduce((_, item) => marcas.push(item.descripcion), '')

        const { writeBinaryFile, BaseDirectory } = window.__TAURI__.fs
        const { save } = window.__TAURI__.dialog
        const filename = 'Reporte ' + marcas.join('-') + ' ' + $moment().format('DDMMYYYY_Hmmss')

        const filePath = await save({
          filters: [{ name: 'Archivo de Excel', extensions: ['xlsx'] }],
          defaultPath: BaseDirectory.Desktop + '/' + filename
        })
        if (!filePath) return
        url = new Blob([response.data])
        var blob = await url.arrayBuffer()
        await writeBinaryFile(filePath, blob)

        // console.log(filePath)
        archivo.value = filePath
        show_downloaded.value = true
      }
    })
    .catch(e => console.log(e.toJSON()))

  loadingGlobal.value = false
}

const gridMarca = ref({})
const gridLinea = ref({})

const readyMarcas = params => (gridMarca.value = params.api)
const readyLineas = params => (gridLinea.value = params.api)

watch(searchText, async (newQuestion) => {
  gridMarca.value.setQuickFilter(newQuestion)
  gridMarca.value.redrawRows()
})

onMounted(async () => {
  marcas.value = await new MarcaModel().listar('JCHS2024') //ok
  lineas.value = await new LineasProductosModel().listar('JCHS2024') //ok
})
</script>

<template lang="pug">
div
  Toast(:mensaje="mensaje" :show="loadingGlobal")
  ToastDownload(:archivo="archivo" :show="show_downloaded" @close-toast="show_downloaded = false")

  v-container.py-2(fluid)

    v-row(dense)
      //- v-col(cols="3")

        TituloVista(titulo="Reporte de Tracking" :lista='["Comex", "Reportes"]')

    v-row(dense)
      v-col.sboton.rounded.pa-2(cols="3")
        v-filtro-input.mb-2(v-model="searchText" placeholder="Filtrar marca")
        agGrid(
          :filtro="searchText"
          :column-defs="columnas"
          :data="marcas"
          row-selection="multiple"
          style="width: 100%; height: calc(100vh - 170px)"
          @grid-ready="readyMarcas")

      v-col.boton.rounded.pa-2(cols="3")
        agGrid(
          :auto-group-column-def="autoGroupColumnDef"
          :column-defs="columnas_lineas"
          :data="lineas"
          :group-selects-children="true"
          row-selection="multiple"
          style="width: 100%; height: calc(100vh - 122px)"
          @grid-ready="readyLineas"
          )

      v-col.botons.rounded.py-2.px-3.my-2(cols="6")
        //- v-checkbox(label='Incluir pedidos (precios FOB y Cantidad)' v-model='con_pedidos')
        v-btn(:disabled="loadingGlobal" @click="ejecutarReporte()") {{ loadingGlobal ? 'Ejecutandose...' : 'Ejecutar' }}

        hr.mt-4.mb-2

        template(v-for="paso in pasos" :key="paso")
          div
            span.text-h6 {{ paso.titulo }} [documentos: {{ paso.documentos }} | total :{{ paso.total }}]
            v-icon(v-if="paso.loading" icon="mdi-loading mdi-spin pl-2" size="14")

        v-btn.mt-2(:disabled="loadingGlobal" color="secondary" @click="enviarExcel()") Descargar excel
</template>
