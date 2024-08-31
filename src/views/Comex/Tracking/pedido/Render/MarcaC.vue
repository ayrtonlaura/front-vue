<script setup>
import { ref, watch } from 'vue'

const rowData = ref([])
const filtro = ref('')
const gridApi = ref(null)
const selectedRowData = ref([])
const selectedRowIds = ref([])
//Check
const showOnlySelected = ref(false)
async function loadData() {
  gridApi.value.showLoadingOverlay()

  await new Promise(r => setTimeout(r, 500))
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

  gridApi.value.setRowData(rowData.value)
  restoreSelection()
  gridApi.value.hideOverlay()
}

const emits = defineEmits(['closeDialog', 'marcasEmit', 'update:selectedRowIds'])
const closeDialog = () => {
  emits('closeDialog')
}

const readyTabla = async params => {
  gridApi.value = params.api
  loadData()
}

const onSelectionChanged = () => {
  const selectedNodes = gridApi.value.getSelectedNodes()
  selectedRowData.value = selectedNodes.map(node => node.data)
  selectedRowIds.value = selectedRowData.value.map(row => row.id)
  emits('update:selectedRowIds', selectedRowIds.value)
  emits(
    'marcasEmit',
    selectedRowData.value.map(row => row.marca)
  )
}

const restoreSelection = () => {
  setTimeout(() => {
    gridApi.value.forEachNode(node => {
      if (selectedRowIds.value.includes(node.data.id)) {
        node.setSelected(true)
      }
    })
  }, 0)
}
//FILTRAR SELECT
const filterData = () => {
  // Guardar la selección actual antes de filtrar
  const currentSelectedNodes = gridApi.value.getSelectedNodes()
  const currentSelectedIds = currentSelectedNodes.map(node => node.data.id)

  if (showOnlySelected.value) {
    const filteredData = rowData.value.filter(row => selectedRowIds.value.includes(row.id))
    gridApi.value.setRowData(filteredData)
  } else {
    gridApi.value.setRowData(rowData.value)
  }

  // Restaurar la selección después de aplicar el filtro
  setTimeout(() => {
    gridApi.value.forEachNode(node => {
      if (selectedRowIds.value.includes(node.data.id) || currentSelectedIds.includes(node.data.id)) {
        node.setSelected(true)
      }
    })
  }, 0)
}
watch(showOnlySelected, filterData)

function btnAceptar() {
  emits('closeDialog')
}

function clearSelection() {
  gridApi.value.deselectAll()
  selectedRowIds.value = []
}
const columnDefs = [
  { headerName: 'DESCRIPCION', field: 'marca', width: 340 },
  { headerName: 'ELIJA', checkboxSelection: true, width: 100 }
]
</script>

<template lang="pug">
v-dialog(width="500")
  v-card
    v-card-title.d-flex.justify-space-between.align-center 
      div.text-h5.text-medium-emphasis.ps-2 JCH Comercial 2024
      v-btn(@click="closeDialog()" icon="mdi-close" variant="tonal")
    v-card-text.pt-0.gap-50.align-center
        VFiltroInput(v-model="filtro" placeholder="Marca...")
        v-btn( variant="tonal" icon="mdi-update" @click="clearSelection()")
        v-checkbox(label="Mostrar Seleccionados" v-model="showOnlySelected")

    v-card-text
      div
        agGrid(
          ref="grid"
          row-height="50"
          :column-defs="columnDefs"
          :row-data="rowData"
          :quick-filter-text="filtro"
          row-selection="multiple"
          :suppress-copy-rows-to-clipboard="true"
          :suppress-row-click-selection="true"
          style="width: 100%; height: calc(100vh - 400px)"
          @grid-ready="readyTabla"
          @selection-changed="onSelectionChanged"
        )
      div.gap-10.justify-end.pt-3
        v-btn(prepend-icon="mdi-check" variant="tonal" @click="btnAceptar()") Aceptar
        v-btn(prepend-icon="mdi-close" variant="tonal" color="success") Salir
</template>
