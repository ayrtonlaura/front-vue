<script setup>
import { ref, inject, watch } from 'vue'
const rowData = ref([])
const filtro = ref('')

const columnDefs = [
  {
    headerName: 'CODAGETRA',
    field: 'CODAGETRA',
    width: 150,
    resizable: true,
    wrapText: true,
    autoHeight: true,
    cellClass: 'justify-center'
  },
  {
    headerName: 'DIRAGETRA',
    field: 'DIRAGETRA',
    width: 280,
    cellClass: 'justify-center'
  },
  {
    headerName: 'NOMAGETRA',
    field: 'NOMAGETRA',
    flex: 1,
    cellClass: 'justify-center'
  }
]

const selectedClient = inject('selectedClient')

watch(
  () => selectedClient.codigo,
  newCodigo => {
    if (newCodigo) {
      rowData.value = [
        {
          CODAGETRA: newCodigo,
          DIRAGETRA: 'av. nicolas',
          NOMAGETRA: 'SHALOM'
        }
      ]
    }
  }
)
</script>

<template lang="pug">
div
  div.pb-4
    div.w300.mx-left
      VFiltroInput(v-model="filtro" placeholder="Buscar por Codigo, Direccion o Agencia..." )
  div
    agGrid(
          row-height="50"
          :column-defs="columnDefs"
          :data="rowData"
          :filtro="filtro"
          row-selection="single"
          :suppress-copy-rows-to-clipboard="true"
          :suppress-row-click-selection="false"
          style="width: 100%; height: calc(100vh - 250px)"
          )

</template>
