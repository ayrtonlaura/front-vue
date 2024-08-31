<script>
export default { name: 'comex-tracking-parte-entrada' }
</script>
<script setup>
import { ref } from 'vue'
import DatosProforma from './Render/DatosProforma.vue'
import BuscarPedido from '../Componentes/BuscarPedido.vue'

const filtro = ref('')

const columnDefs = [
  { headerName: 'Codigo', field: 'tipo', width: 100 },
  { headerName: 'Producto', field: 'marca', flex: 1 },
  { headerName: 'Precio', width: 100 },
  { headerName: 'Cantidad', width: 80 },
  { headerName: 'Nro. Invoice', width: 120 },
  { headerName: 'Nro. Contenedor', width: 100 },
  { headerName: 'Ingreso', width: 120 }
]

const cmpBuscarPedido = ref(null)
const openSearch = () => {
  cmpBuscarPedido.value.show()
}
const selectedRowData = ref([])
function handleRowDoubleClicked(data) {
  selectedRowData.value = [data]
}
</script>
<template lang="pug">
div
  BuscarPedido(ref="cmpBuscarPedido" @rowDoubleClicked="handleRowDoubleClicked")

  v-container.pa-3(fluid)
    v-row 
      v-col(cols="4")
        DatosProforma
      v-col(cols="8") 

        v-row.mb-2(dense align="center")   
          v-col
            p.text-h4.text-primary.font-weight-bold Invoice
            
          v-col.gap-10.justify-end
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
