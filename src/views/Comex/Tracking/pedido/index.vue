<script>
export default { name: 'comex-tracking-pedido' }
</script>
<script setup>
import { ref } from 'vue'

import BuscarPedido from '../Componentes/BuscarPedido.vue'
import ProveedorC from './Render/ProveedorC.vue'
import MarcaC from './Render/MarcaC.vue'
import DetalleVentasRender from './Render/DetalleVentasRender.vue'

const filtro = ref('')

const columnDefs = [
  {
    headerName: '#',
    cellClass: 'custom-cell',
    valueGetter: 'node.rowIndex + 1',
    width: 60
  },
  { headerName: 'CODPRO', field: 'marca', width: 100, cellStyle: { display: 'inline-flex', padding: '6px' } },
  { headerName: 'PRODUCTO', flex: 1 },
  { headerName: '', width: 50, cellRenderer: DetalleVentasRender },
  { headerName: 'FOB', width: 80 },
  {
    headerName: 'PEDIDO',

    children: [
      {
        columnGroupShow: 'open',
        field: 'PRIORIDAD',
        width: 80,
        cellClass: 'bg-light-blue-lighten-5',
        editable: true,
        cellEditor: 'agSelectCellEditor',
        cellEditorParams: {
          values: ['Normal', 'Alta']
        }
      },
      { columnGroupShow: 'open', field: 'PRECIO', width: 70, cellClass: 'bg-light-blue-lighten-5', editable: true },
      { columnGroupShow: 'open', field: 'CANT', width: 70, cellClass: 'bg-light-blue-lighten-5', editable: true }
    ]
  },
  {
    headerName: 'SEGUIMIENTO',
    children: [
      { columnGroupShow: 'open', field: 'PED', width: 50, cellClass: 'bg-teal-lighten-5' },
      { columnGroupShow: 'open', field: 'PROF', width: 50, cellClass: 'bg-teal-lighten-5' },
      { columnGroupShow: 'open', field: 'FAB', width: 50, cellClass: 'bg-teal-lighten-5' },
      { columnGroupShow: 'open', field: 'TRAN', width: 50, cellClass: 'bg-teal-lighten-5' },
      { columnGroupShow: 'open', field: 'ADUA', width: 50, cellClass: 'bg-teal-lighten-5' },
      { columnGroupShow: 'open', field: 'FIN', width: 50, cellClass: 'bg-teal-lighten-5' }
    ]
  },
  {
    headerName: 'JCH LLANTAS',
    children: [
      { columnGroupShow: 'open', field: 'JCH_STK', width: 60, cellClass: 'bg-deep-orange-lighten-5' },
      { columnGroupShow: 'open', field: 'JCH_VTA', width: 60, cellClass: 'bg-deep-orange-lighten-5' }
    ]
  },
  {
    headerName: 'EVOCARS',
    children: [
      { columnGroupShow: 'open', field: 'EVO_STK', width: 60, cellClass: 'bg-deep-orange-lighten-5' },
      { columnGroupShow: 'open', field: 'EVO_VTA', width: 60, cellClass: 'bg-deep-orange-lighten-5' }
    ]
  },
  {
    headerName: 'NEUMACENTER',
    children: [
      { columnGroupShow: 'open', field: 'NEU_STK', width: 60, cellClass: 'bg-deep-orange-lighten-5' },
      { columnGroupShow: 'open', field: 'NEU_VTA', width: 60, cellClass: 'bg-deep-orange-lighten-5' }
    ]
  }
]
const cmpMarca = ref(false)
const marcaOpen = () => (cmpMarca.value = true)
const cmpProveedor = ref(false)
const proveedorSearch = () => {
  console.log('Click Proveedor')
  cmpProveedor.value = true
}
const cmpBuscarPedido = ref(null)
const openSearch = () => {
  cmpBuscarPedido.value.show()
}

const habilitar = ref(true)
const crearPedido = () => (habilitar.value = false)
const deshabilitar = () => (habilitar.value = true)

const selectProveedor = ref('')
function handleRowDoubleClickProveedor(data) {
  selectProveedor.value = data.marca
}
const selectedRowData = ref([])
function handleRowDoubleClicked(data) {
  selectedRowData.value = [data]
}
const handleCloseDialog = () => {
  cmpMarca.value = false
  cmpProveedor.value = false
}
const selectMarca = ref([])
function marcasEmit(data) {
  selectMarca.value = data
}
</script>
<template lang="pug">
div
  BuscarPedido(ref="cmpBuscarPedido" @rowDoubleClicked="handleRowDoubleClicked")
  ProveedorC(v-model="cmpProveedor" @closeDialog="handleCloseDialog" @rowDoubleClickProveedor="handleRowDoubleClickProveedor" )
  MarcaC(v-model="cmpMarca" @closeDialog="handleCloseDialog" @marcasEmit="marcasEmit")
  v-container.pa-3(fluid)
    v-row 
      v-col(cols="12") 
        p.text-h4.text-primary.font-weight-bold Generar Pedido de Importacion
      v-col(cols="12") 
        v-row.mb-2(dense align="center")
          v-col.gap-10.align-center(cols="2")
            v-btn(variant="tonal" icon="mdi-account-group" @click="proveedorSearch()" :disabled="habilitar") 
            v-text-field(label="Proveedor" readonly v-model="selectProveedor" :disabled="habilitar")
          v-col.gap-5.align-center(cols="2")
            v-btn(variant="tonal" icon="mdi-watermark" @click="marcaOpen()" :disabled="habilitar")
            v-select(label="Marcas" v-model="selectMarca"  readonly multiple :disabled="habilitar")
              template(v-slot:selection="{ item, index }")
                v-chip(v-if="index < 2" color="info")
                  span.text-h6 {{ item.title }}
                span(v-if="index === 2" class="text-grey text-caption align-self-center") (+{{ selectMarca.length - 2 }} others)
          //- v-spacer
          v-col.gap-10.pl-5(cols="2")
            v-checkbox.text-primary(label="Solo Pedido" color="primary" :disabled="habilitar")
            v-checkbox.text-primary(label="Editar Pedido" color="primary" :disabled="habilitar")

          v-col.gap-10.justify-end(cols="5")
            v-btn( color="primary" variant="tonal" prepend-icon="mdi-content-save-all" :disabled="habilitar") Guardar Pedido
            v-btn( color="red" variant="tonal" prepend-icon="mdi-close" :disabled="habilitar" @click="deshabilitar()") Cancelar
            v-btn(variant="tonal" prepend-icon="mdi-application-edit-outline" :disabled="!habilitar" @click="crearPedido()" ) Crear Pedido
            v-btn(color="success" variant="tonal" prepend-icon="mdi-archive-search-outline" :disabled="!habilitar" @click="openSearch()") Buscar Pedido
        v-row(dense)
          v-col
            agGrid( 
              row-height="40"
              :column-defs="columnDefs"
              :filtro="filtro"
              row-selection="multiple"
              :suppress-copy-rows-to-clipboard="true"
              style="width: 100%; height: calc(100vh - 210px)"
              :rowData="selectedRowData"
              )

</template>
