<script>
export default { name: 'comex-tracking-invoice' }
</script>
<script setup>
import { ref, watch } from 'vue'
import DatosProforma from './Render/DatosProforma.vue'
import BuscarPedido from '../Componentes/BuscarPedido.vue'

const filtro = ref('')

const columnDefs = [
  { headerName: '', cellClass: 'custom-cell', checkboxSelection: true, valueGetter: 'node.rowIndex + 1', width: 45 },
  { headerName: 'CODPRO', field: 'tipo', flex: 1, cellStyle: { display: 'inline-flex', padding: '6px' } },
  { headerName: 'DESPRO', field: 'marca', flex: 1, cellStyle: { display: 'inline-flex', padding: '6px' } },
  { headerName: 'PRECIO', flex: 1, cellStyle: { display: 'inline-flex', padding: '6px' } },
  { headerName: 'CANTIDAD', flex: 1, cellStyle: { display: 'inline-flex', padding: '6px' } },
  { headerName: 'PENDIEN', flex: 1, cellStyle: { display: 'inline-flex', padding: '6px' } },
  { headerName: 'ASIGNAR', flex: 1, cellStyle: { display: 'inline-flex', padding: '6px' } }
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
  BuscarPedido(ref="cmpBuscarPedido"  @rowDoubleClicked="handleRowDoubleClicked")
  v-container.pa-3(fluid)
    v-row         
      v-col(cols="3")
        DatosProforma
      v-col(cols="9") 

        v-row.mb-2(dense align="center")  
          v-col 
            p.text-h4.text-primary.font-weight-bold Registrar Invoice 
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
