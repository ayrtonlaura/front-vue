<script setup>
import { ref, inject, watch } from 'vue'
const rowData = ref([])
const filtro = ref('')

const columnDefs = [
  {
    headerName: 'NUM_DOC',
    width: 80,
    field: 'NUM_DOC',
    resizable: true,
    wrapText: true,
    autoHeight: true
  },
  {
    headerName: 'FECH_DOC',
    field: 'FECH_DOC',
    width: 80,
    cellClass: 'justify-center'
  },
  {
    headerName: 'FECH_VENC',
    field: 'FECH_VENC',
    width: 80,
    cellClass: 'justify-center'
  },
  {
    headerName: 'DIAS_VENC',
    field: 'DIAS_VENC',
    width: 100,
    cellClass: 'justify-center'
  },
  {
    headerName: 'MDA',
    field: 'MDA',
    width: 50,
    cellClass: 'justify-center'
  },
  {
    headerName: 'IMPORTE',
    field: 'IMPORTE',
    width: 60,
    cellClass: 'bg-blue-lighten-5 text-blue justify-center',
    cellStyle: {
      padding: '0'
    }
  },
  {
    headerName: 'PAGOS',
    field: 'PAGOS',
    cellClass: 'bg-green-lighten-5 text-green justify-center',
    width: 50,
    cellStyle: {
      padding: '0'
    }
  },
  {
    headerName: 'SALDO',
    field: 'SALDO',
    cellClass: 'bg-red-lighten-5 text-red justify-center',
    width: 50,
    cellStyle: {
      padding: '0'
    }
  },
  {
    headerName: 'PORC_PERCE',
    field: 'PORC_PERCE',
    width: 100,
    cellClass: 'bg-yellow-lighten-5 text-shades justify-center'
  },
  {
    headerName: 'PERCE',
    field: 'PERCE',
    width: 80,
    cellClass: 'bg-yellow-lighten-5 text-shades justify-center'
  },
  {
    headerName: 'EST_LETR',
    field: 'EST_LETR',
    width: 80,
    cellClass: 'justify-center'
  },
  {
    headerName: 'NOMB_VEND',
    field: 'NOMB_VEND',
    flex: 1,
    minWidth: 150,
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
          NUM_DOC: newCodigo,
          FECH_DOC: '2023-07-01',
          FECH_VENC: '2024-08-01',
          DIAS_VENC: 30,
          MDA: 'PEN',
          IMPORTE: 1000,
          PAGOS: 200,
          SALDO: 800,
          PORC_PERCE: 0.1,
          PERCE: 100,
          EST_LETR: 'A',
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
    v-btn(variant="tonal" color="success" prepend-icon="mdi-microsoft-excel") Exportar

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
