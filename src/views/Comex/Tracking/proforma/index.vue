<script>
export default { name: 'comex-tracking-proforma' }
</script>
<script setup>
import { ref } from 'vue'
import DatosProforma from './Render/DatosProforma.vue'
import AgregarProducto from './Render/AgregarProducto.vue'
import BuscarPedido from '../Componentes/BuscarPedido.vue'
const filtro = ref('')
const cmpAgregarProducto = ref(null)
const columnDefs = [
  {
    headerName: '',
    cellClass: 'custom-cell',
    valueGetter: 'node.rowIndex + 1',
    width: 60,
    checkboxSelection: true
  },
  { headerName: 'CODPRO', field: 'marca', flex: 1, cellStyle: { display: 'inline-flex', padding: '6px' } },
  { headerName: 'DESPRO', flex: 1 },
  { headerName: 'PEDIDO', flex: 1 },
  { headerName: 'PENDIENTE', flex: 1 },
  { headerName: 'ASIGNAR', flex: 1 },
  { headerName: 'PRECIO', flex: 1 },
  { headerName: 'PREPED', flex: 1 }
]

const cmpBuscarPedido = ref(null)
const openSearch = () => {
  cmpBuscarPedido.value.show()
}
const selectedRowData = ref([])
function handleRowDoubleClicked(data) {
  selectedRowData.value = [data]
}
function addProduct() {
  cmpAgregarProducto.value = true
}
function closeDialog() {
  cmpAgregarProducto.value = false
}
</script>
<template lang="pug">
div
  BuscarPedido(ref="cmpBuscarPedido" @rowDoubleClicked="handleRowDoubleClicked")
  AgregarProducto(v-model="cmpAgregarProducto" @closeDialog="closeDialog")
  v-container.pa-3(fluid)
    v-row 
      v-col(cols="3")
        DatosProforma
      v-col(cols="9") 

        v-row.mb-2(dense align="center")  
          v-col 
            p.text-h4.text-primary.font-weight-bold Registro Proforma

          v-col.gap-10.justify-end
            v-btn(variant="tonal" prepend-icon="mdi-application-edit-outline" @click="addProduct()") Agregar Producto
            v-btn(color="success" variant="tonal" prepend-icon="mdi-archive-search-outline" @click="openSearch()") Buscar Pedido
        v-row(dense)
          v-col
            agGrid( 
              row-height="40"
              :column-defs="columnDefs"
              :filtro="filtro"
              row-selection="multiple"
              :suppress-copy-rows-to-clipboard="true"
              style="width: 100%; height: calc(100vh - 180px)"
              :rowData="selectedRowData"
              )
</template>
