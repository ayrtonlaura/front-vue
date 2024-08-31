<script>
export default { name: 'atencion-clientes-reportes-guias-despacho' }
</script>
<script setup>
import { computed, inject, reactive, ref, toRaw, watch } from 'vue';
import { $moment } from '@/plugins'

import {
  // AlmacenesModel, ClienteModel,
  GuiasModel
} from '@/models';
import renderCellGuia from './renders/render_cell_guia.vue'
import cmp_clientes from '../../Despachos/components/cmp_clientes.vue'

const entorno = reactive({

})

// const {
//   // mostrar_buscar_guias,

//   // entorno,
//   // orden_actual,
//   // agregar_guias,

//   // onVerUbicacion,
//   // onVerDetalles,
//   // loadings

// } = inject("despachos")


// watch(() => loadings.en_creacion, (v) => {
//   if (v == false) {
//     console.log("limpiar guias_buscar");

//     btnBuscarClick.value = false
//     let fec = $moment().utc(-5).format("YYYY-MM-DD")
//     busqueda.empresa = sesion.value.conexion.id
//     busqueda.almacen = []
//     busqueda.cliente = {}
//     busqueda.tipoCliente = []
//     busqueda.tipoMovimiento = []
//     busqueda.fecha = [fec, fec]
//     busqueda.guias_sel = []
//     rowDataDos.value = []
//     filtro.value = ''
//   }
// }, {
//   deep: true
// })

// const props =
defineProps({
  guiasSeleccionadas: {
    type: Array,
    default: null
  }
})

let { sesion } = inject('Menus')

const readyGridGuias = params => (gridApi.value = params.api)

const filtro = ref('')
const rowDataDos = ref([])
const gridApi = ref({})

// const m_almacen = new AlmacenesModel()
// const m_cliente = new ClienteModel()
const m_guias = new GuiasModel()

const columnDefs_buscar = ref([
  { field: 'C5_CNUMDOC', hide: true },
  { field: 'C5_DFECDOC', hide: true },
  { field: 'cliente', hide: true },
  { field: 'movimiento', hide: true },
  { field: 'direccion', hide: true },
  // { field: 'estado', width: 90, hide: false },
  {
    field: 'guia',
    headerComponent: null,
    headerName: 'Acciones',
    sortable: false,
    flex: 1,
    cellRenderer: renderCellGuia,
    cellRendererParams: params => {
      return {
        filtro: filtro.value,
        seleccionar: true,
        quitar: false,
        ver_detalles: () => {
          // onVerDetalles(params.data)
        },
        ver_ubicacion: () => {
          // onVerUbicacion(params.data)
        },
        añadir: () => {
          // agregar_guias([params.data])
          gridApi.value.applyTransaction({ remove: [params.data] })
        }
      }

    },
    cellStyle: { display: 'inline-block', padding: '0' }
  }
])

const busqueda = reactive({
  empresa: sesion.value.conexion.id,
  almacen: [],
  cliente: {},
  tipoCliente: [],
  tipoMovimiento: [],
  fecha: [$moment().utc(-5), $moment().utc(-5)],
  guias_sel: []
})

const errores_guias = computed(() => {
  if (!btnBuscarClick.value) return {
    almacen: '', tipoCliente: ''
  }
  return {
    almacen: busqueda.almacen.length == 0 ? 'error' : '',
  }
})

const btnBuscarClick = ref(false)

const buscarGuias = async () => {
  btnBuscarClick.value = true

  let err = 0
  Object.values(errores_guias.value).forEach(v => {
    if (v == "error") ++err
  });

  if (err > 0) return

  // console.log(orden_actual.value.guias);

  // let guias = orden_actual.value.guias.map(g => g.guia)
  let guias = []

  gridApi.value.setGridOption('rowData', [])
  gridApi.value.showLoadingOverlay()

  busqueda.guias_sel = guias
  rowDataDos.value = await m_guias.buscar(toRaw(busqueda))
  gridApi.value.hideOverlay()
}

function addItem() {
  let items = gridApi.value.getSelectedRows()
  if (items.length > 0) {
    // agregar_guias(items)
    gridApi.value.applyTransaction({ remove: items })
  }
}

watch(filtro, async (newValue) => {
  gridApi.value.setGridOption('quickFilterText', newValue)
  gridApi.value.redrawRows()
})
</script>
<template lang="pug">
v-container.pa-1.py-0.drawer
  v-row(dense)
    v-col.pl-12.p-relative(cols="12")

      div(style="position: absolute; top: 45%; left: 4px")
        v-btn(v-tippy content="Añadir guias seleccionadas" icon="mdi-chevron-left mdi-30px" @click="addItem()")

      div.text-h5.pa-2.font-weight-bold Buscar guias de remisión

      v-container.pa-1(fluid)
        v-row(dense align="end")
          v-col.gap-7.align-center.mb-1
            v-select.included(
              v-model="busqueda.almacen" label="Almacen" multiple 
              :items="entorno.almacenes" 
              item-value="codigo"
              placeholder="Selecione uno o varios" 
              :return-object="false" 
              :error-messages="errores_guias.almacen" hide-details
              )
              template(#selection="{ index }")
                template(v-if="index === 0")
                  div.gap-5.text-h6.pl-1(style="font-size: 13px !important")
                    span.font-weight-bold {{ busqueda.almacen.length }} 
                    span {{ busqueda.almacen.length==1 ? 'seleccionado' : 'seleccionados' }}

            v-fecha.w220(v-model="busqueda.fecha" titulo="Fecha")

            v-btn(prepend-icon="mdi-magnify" @click="buscarGuias()") Buscar

        v-row(dense align="end")
          v-col(cols="3")
            v-select.todos(
              v-model="busqueda.tipoCliente" 
              label="Tipo de Cliente" 
              :items="entorno.tipos_clientes" 
              placeholder="- Todos -"
              item-value="codigo"
              multiple :return-object="false" :error-messages="errores_guias.tipoCliente" hide-details
              )
              template(#selection="{ index }")
                template(v-if="index === 0")
                  div.gap-5.text-h6.pl-1(style="font-size: 13px !important")
                    span.font-weight-bold {{ busqueda.tipoCliente.length }} 
                    span {{ busqueda.tipoCliente.length==1 ? 'seleccionado' : 'seleccionados' }}

          v-col(cols="3")
            v-select.todos(
              v-model="busqueda.tipoMovimiento" label="Tipo de Movimiento" :items="entorno.movimientos" placeholder="- Todos -" 
              multiple :return-object="false" :error-messages="errores_guias.movimiento" hide-details
                )
                template(#selection="{ index }")
                  template(v-if="index === 0")
                    div.gap-5.text-h6.pl-1(style="font-size: 13px !important")
                      span.font-weight-bold {{ busqueda.tipoMovimiento.length }} 
                      span {{ busqueda.tipoMovimiento.length==1 ? 'seleccionado' : 'seleccionados' }}

          v-col(cols="6")
            cmp_clientes(v-model="busqueda.cliente")

        v-row(dense align="end")
          v-col(cols="12")
            agGrid.mt-1.mb-2.noHeader(
              row-selection="multiple"
              :filtro="filtro"
              :column-defs="columnDefs_buscar"
              :include-hidden-columns-in-quick-filter="true"
              :row-data="rowDataDos"
              :row-height="42"
              :style="{width: '100%', height: 'calc(100vh - 260px)'}"
              @grid-ready="readyGridGuias"
              )
              //- :onRowDoubleClicked="onRowDoubleClicked"
              //- :rowMultiSelectWithClick='true'

            div.w250
              v-filtro-input(v-model="filtro" placeholder="Fitlrar guias...")
</template>