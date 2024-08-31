<script setup>
import { ref } from 'vue'

const rowData = ref([])
const filtro = ref('')
const grid = ref()

const emits = defineEmits(['closeDialog', 'almacenEmit'])
const closeDialog = () => {
  emits('closeDialog')
}

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

const readyTabla = async params => {
  grid.value = await params.api
  loadData()
}

const columnDefs = [
  { headerName: '', cellClass: 'custom-cell', valueGetter: 'node.rowIndex + 1', width: 45 },
  {
    headerName: 'Codigo',
    flex: 1,
    field: 'marca',
    cellStyle: { display: 'inline-flex', padding: '6px' }
  },
  {
    headerName: 'Descripcion',
    width: 100,
    cellStyle: {
      padding: '0'
    }
  }
]

function selecAlmacen(event) {
  emits('almacenEmit', event.data)
}
</script>

<template lang="pug">
v-dialog(width="500")
  v-card 
    v-card-title.d-flex.justify-space-between.align-center
      div.text-h5.text-medium-emphasis.ps-2.text-primary Seleccionar Almacen
        
      v-btn(icon="mdi-close" variant="tonal" color="red" @click="closeDialog()")
    v-card-text.py-0
      div.pb-5.text-primary
        v-select(label="Agencia" :items="['California', 'Colorado', 'Wyoming']")
      div
        agGrid(
              row-height="50"
              :column-defs="columnDefs"
              :data="rowData"
              :filtro="filtro"
              row-selection="single"
              :suppress-copy-rows-to-clipboard="true"
              :suppress-row-click-selection="false"
              style="width: 100%; height: calc(100vh - 600px)"
              @grid-ready="readyTabla"
              @row-double-clicked="selecAlmacen"
              )
      div.py-2
        VFiltroInput(v-model="filtro" placeholder="Buscar Codigo o Almacen..." )
    v-card-actions.gap-20.justify-end
      v-btn(variant="tonal" text="Salir" @click="closeDialog()") 
</template>
