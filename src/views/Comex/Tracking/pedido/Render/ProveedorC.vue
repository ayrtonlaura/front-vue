<script setup>
import { ref } from 'vue'

const rowData = ref([])
const filtro = ref('')
const grid = ref()

async function loadData() {
  grid.value.showLoadingOverlay()

  await new Promise(r => setTimeout(r, 500))
  grid.value.setRowData([])
  rowData.value = [
    {
      id: 1,
      tipo: 'iso',
      descripcion: 'ISO 1 - PDF',
      marca: 'BOTO',
      marca_id: 'BOT',
      archivo: 'http://localhost:5000/src/assets/download.pdf'
    },
    {
      id: 2,
      tipo: 'iso',
      descripcion: 'ISO 2 - Imagen',
      marca: 'SINOTRUK',
      marca_id: 'SIN',
      archivo: 'http://localhost:5000/src/assets/download.pdf'
    },
    {
      id: 3,
      tipo: 'iso',
      descripcion: 'ISO 3 - PDF',
      marca: 'OTANI',
      marca_id: 'OTA',
      archivo: 'http://localhost:5000/src/assets/download.pdf'
    },
    {
      id: 4,
      tipo: 'iso',
      descripcion: 'ISO 4 - Imagen',
      marca: 'DUNLOP',
      marca_id: 'DUN',
      archivo: 'http://localhost:5000/src/assets/download.pdf'
    },
    {
      id: 5,
      tipo: 'catalogo',
      descripcion: 'Catalogo 1',
      marca: 'BIRLA',
      marca_id: 'BIR',
      archivo: 'http://localhost:5000/src/assets/download.pdf'
    },
    {
      id: 6,
      tipo: 'catalogo',
      descripcion: 'Catalogo 2',
      marca: 'WESTLAKE',
      marca_id: 'WES',
      archivo: 'http://localhost:5000/src/assets/download.pdf'
    },
    {
      id: 7,
      tipo: 'catalogo',
      descripcion: 'Catalogo 3',
      marca: 'GOODTYRE',
      marca_id: 'GOD',
      archivo: 'http://localhost:5000/src/assets/download.pdf'
    },
    {
      id: 8,
      tipo: 'catalogo',
      descripcion: 'Catalogo 5',
      marca: 'DUNLOP',
      marca_id: 'DUN',
      archivo: 'http://localhost:5000/src/assets/download.pdf'
    }
  ]

  grid.value.hideOverlay()
}

const emits = defineEmits(['closeDialog', 'rowDoubleClicked'])
const closeDialog = () => {
  emits('closeDialog')
}

const readyTabla = async params => {
  grid.value = await params.api
  loadData()
}
const columnDefs = [
  { headerName: 'COD_PROV', field: 'tipo', width: 340 },
  { headerName: 'DES_PROV', field: 'marca', width: 100 }
]
const dialogProveedor = ref(null)

function onRowDoubleClickProveedor(event) {
  console.log('Double clicked row data Proveedores:', event.data)
  emits('rowDoubleClickProveedor', event.data)
  emits('closeDialog')
}
</script>

<template lang="pug">
v-dialog(v-model="dialogProveedor" width="500")
  v-card
    v-card-title.d-flex.justify-space-between.align-center 
      div.text-h5.text-medium-emphasis.ps-2 JCH Comercial 2024
        
      v-btn(@click="closeDialog()" icon="mdi-close" variant="tonal")
    v-card-text.pt-0
      div.py-2.w200
        VFiltroInput(v-model="filtro" placeholder="Buscar Codigo o Nombre..." )
      div
        agGrid(
          row-height="100"
          :column-defs="columnDefs"
          :data="rowData"
          :filtro="filtro"
          row-selection="single"
          :suppress-copy-rows-to-clipboard="true"
          :suppress-row-click-selection="false"
          style="width: 100%; height: calc(100vh - 400px)"
          @grid-ready="readyTabla"
          @row-double-clicked="onRowDoubleClickProveedor"
          )
</template>
