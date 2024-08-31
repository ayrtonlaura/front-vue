<script setup>
import { ref } from 'vue'
import PedidoRender from './Render/PedidoRender.vue'
import CellAction from './Render/CellAction.vue'

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
  // { headerName: '', cellClass: 'custom-cell', valueGetter: 'node.rowIndex + 1', width: 45 },
  {
    headerName: 'PEDIDO',
    width: 780,
    resizable: true,
    wrapText: true,
    autoHeight: true,
    cellRenderer: PedidoRender
  },
  { headerName: '', field: '', width: 45 },
  {
    headerName: 'Acciones',
    width: 100,
    cellRenderer: CellAction,
    cellStyle: {
      padding: '0'
    }
  }
]

const dialogoBuscar = ref(null)
function show() {
  dialogoBuscar.value = true
}
function close() {
  dialogoBuscar.value = false
}
defineExpose({ show, close })

const emits = defineEmits(['rowDoubleClicked'])

function onRowDoubleClicked(event) {
  emits('rowDoubleClicked', event.data)
  dialogoBuscar.value = false
}
</script>
<template lang="pug">
div
  v-dialog(v-model="dialogoBuscar" width="1000")
    v-card
      v-card-title.d-flex.justify-space-between.align-center.pb-0
        div.text-h5.text-medium-emphasis.ps-2 JCH Comercial 2024
          
        v-btn(icon="mdi-close" variant="tonal" @click="close()")
                  
      v-card-text.pt-0
        v-row(dense)
          v-col
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
                style="width: 100%; height: calc(100vh - 220px)"
                @grid-ready="readyTabla"
                @row-double-clicked="onRowDoubleClicked"
                )
      v-card-actions.gap-10.justify-end.pr-6

          v-btn(variant="tonal" @click="close()") Salir
</template>
