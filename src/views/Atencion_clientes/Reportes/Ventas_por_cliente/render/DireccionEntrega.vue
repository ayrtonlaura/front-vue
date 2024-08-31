<script setup>
import { ref, inject, watch } from 'vue'
const rowData = ref([])
const filtro = ref('')

const columnDefs = [
  {
    headerName: 'COD_DIR',
    field: 'COD_DIR',
    width: 250,
    cellClass: 'justify-center'
  },
  {
    headerName: 'DES_DIR',
    field: 'NOMB_VEND',
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
          COD_DIR: newCodigo,
          NOMB_VEND: 'Vendedor 1'
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
      VFiltroInput(v-model="filtro" placeholder="Buscar Direcciones..." )

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
