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
      archivo: '/src/assets/files/descargar.xlsx'
    },
    {
      id: 2,
      tipo: 'iso',
      descripcion: 'ISO 2 - Imagen',
      marca: 'SINOTRUK',
      marca_id: 'SIN',
      archivo: '/src/assets/files/descargar2.xlsx'
    },
    {
      id: 3,
      tipo: 'iso',
      descripcion: 'ISO 3 - PDF',
      marca: 'OTANI',
      marca_id: 'OTA',
      archivo: '/src/assets/files/descargar.xlsx'
    },
    {
      id: 4,
      tipo: 'iso',
      descripcion: 'ISO 4 - Imagen',
      marca: 'DUNLOP',
      marca_id: 'DUN',
      archivo: '/src/assets/files/descargar.xlsx'
    },
    {
      id: 5,
      tipo: 'catalogo',
      descripcion: 'Catalogo 1',
      marca: 'BIRLA',
      marca_id: 'BIR',
      archivo: '/src/assets/files/descargar.xlsx'
    },
    {
      id: 6,
      tipo: 'catalogo',
      descripcion: 'Catalogo 2',
      marca: 'WESTLAKE',
      marca_id: 'WES',
      archivo: '/src/assets/files/descargar.xlsx'
    },
    {
      id: 7,
      tipo: 'catalogo',
      descripcion: 'Catalogo 3',
      marca: 'GOODTYRE',
      marca_id: 'GOD',
      archivo: '/src/assets/files/descargar.xlsx'
    },
    {
      id: 8,
      tipo: 'catalogo',
      descripcion: 'Catalogo 5',
      marca: 'DUNLOP',
      marca_id: 'DUN',
      archivo: '/src/assets/files/descargar.xlsx'
    }
  ]

  grid.value.hideOverlay()
}

const readyTabla = async params => {
  grid.value = await params.api
  loadData()
}
const columnDefs = [
  {
    headerName: '#',
    cellClass: 'custom-cell',
    valueGetter: 'node.rowIndex + 1',
    width: 60
  },
  { headerName: 'CODPRO', field: 'marca', width: 100, cellStyle: { display: 'inline-flex', padding: '6px' } },
  { headerName: 'PRODUCTO', flex: 1 },
  { headerName: '', width: 30 },
  {
    headerName: 'PEDIDO',

    children: [
      { columnGroupShow: 'open', field: 'PRIORIDAD', width: 80, cellClass: 'bg-light-blue-lighten-5' },
      { columnGroupShow: 'open', field: 'PRECIO', width: 70, cellClass: 'bg-light-blue-lighten-5' },
      { columnGroupShow: 'open', field: 'CANT', width: 70, cellClass: 'bg-light-blue-lighten-5' }
    ]
  },
  {
    headerName: 'SEGUIMIENTO',
    children: [
      { columnGroupShow: 'open', field: 'PED', width: 50, cellClass: 'bg-teal-lighten-5' },
      { columnGroupShow: 'open', field: 'PROF', width: 50, cellClass: 'bg-teal-lighten-5' },
      { columnGroupShow: 'open', field: 'TRAN', width: 50, cellClass: 'bg-teal-lighten-5' },
      { columnGroupShow: 'open', field: 'FIN', width: 50, cellClass: 'bg-teal-lighten-5' }
    ]
  },
  {
    headerName: 'JCH LLANTAS',
    children: [
      { columnGroupShow: 'open', field: 'JCH_STK', width: 60, cellClass: 'bg-deep-orange-lighten-5' },
      { columnGroupShow: 'open', field: 'JCH_VTA', width: 60, cellClass: 'bg-deep-orange-lighten-5' }
    ]
  },
  {
    headerName: 'EVOCARS',
    children: [
      { columnGroupShow: 'open', field: 'EVO_STK', width: 60, cellClass: 'bg-deep-orange-lighten-5' },
      { columnGroupShow: 'open', field: 'EVO_VTA', width: 60, cellClass: 'bg-deep-orange-lighten-5' }
    ]
  },
  {
    headerName: 'NEUMACENTER',
    children: [
      { columnGroupShow: 'open', field: 'NEU_STK', width: 60, cellClass: 'bg-deep-orange-lighten-5' },
      { columnGroupShow: 'open', field: 'NEU_VTA', width: 60, cellClass: 'bg-deep-orange-lighten-5' }
    ]
  }
]
const dialogoBuscar = ref(null)
function show() {
  dialogoBuscar.value = true
}
const emits = defineEmits(['closeDialog'])
function close() {
  emits('closeDialog')
}
defineExpose({ show, close })
</script>
<template lang="pug">

v-dialog(v-model="dialogoBuscar" width="1400")
  v-card
    v-card-title.d-flex.justify-space-between.align-center.pb-0
      div.text-h5.text-medium-emphasis.ps-2 JCH Comercial 2024
        
      v-btn(icon="mdi-close" variant="tonal" @click="close()")
                
    v-card-text.pt-0
      v-row(dense)
        v-col
          div.py-2.w200
            VFiltroInput(v-model="filtro" placeholder="Buscar Descripcion..." )

          div
            agGrid(
              row-height="50"
              :column-defs="columnDefs"
              :data="rowData"
              :filtro="filtro"
              row-selection="single"
              :suppress-copy-rows-to-clipboard="true"
              :suppress-row-click-selection="false"
              style="width: 100%; height: calc(100vh - 220px)"
              @grid-ready="readyTabla"
              )
    v-card-actions.gap-10.justify-end.pr-6

        v-btn(variant="tonal" @click="close()") Salir
</template>
