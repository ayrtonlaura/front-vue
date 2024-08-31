<script setup>
import { ref, inject, watch } from 'vue'
const rowData = ref([])
const filtro = ref('')

const columnDefs = [
  {
    headerName: 'Nombre',
    field: 'NUM_DOC',
    flex: 1,
    resizable: true,
    wrapText: true,
    autoHeight: true,
    cellRenderer: params => {
      const value = params.value
      if (value && value.length > 60) {
        return `${value.substring(0, 60)}...`
      }
      return value
    }
  },
  {
    headerName: 'Correo Electronico',
    field: 'email',
    width: 280,
    cellClass: 'justify-center'
  },
  {
    headerName: 'Telefono',
    field: 'telefono',
    width: 150,
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
          NUM_DOC: selectedClient.NombreCliente,
          email: 'ayrton@gmail.com',
          telefono: '954568012'
        }
      ]
    }
  }
)
</script>

<template lang="pug">
div
  div.w300.mx-left.pb-4
    VFiltroInput(v-model="filtro" placeholder="Buscar por Nombre, Correo o Telefono..." )
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
