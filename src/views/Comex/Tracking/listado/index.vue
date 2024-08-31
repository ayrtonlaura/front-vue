<script>
export default { name: 'comex-tracking-listado-pedidos' }
</script>
<script setup>
import PedidoRender from './Render/PedidoRender.vue'
import CellAction from './Render/CellAction.vue'
import { ref, watch } from 'vue'

const grid = ref()
const rowData = ref([])
const filtro = ref('')
const filaSeleccionada = ref({})

const columnDefs = [
  { headerName: '', cellClass: 'custom-cell', valueGetter: 'node.rowIndex + 1', width: 45 },
  {
    headerName: 'PEDIDO',
    cellRenderer: PedidoRender,
    flex: 1,
    wrapText: true,
    autoHeight: true,
    cellClass: 'px-0'
  },
  {
    headerName: 'SEGUIMIENTO',
    width: 800,
    cellRenderer: CellAction,

    cellStyle: {
      padding: '0'
    }
  }
]

/** Load ISO CATALOGO */
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

  grid.value.setRowData(rowData.value)
  grid.value.hideOverlay()
  grid.value.resetRowHeights()
}

const readyTabla = async params => {
  grid.value = await params.api
  loadData()
  // params.api.sizeColumnsToFit()
}

const onRowClicked = params => {
  filaSeleccionada.value = params.data
}

watch(filtro, async newQuestion => {
  grid.value.setGridOption('quickFilterText', newQuestion)
  grid.value.redrawRows()
})
</script>
<template lang="pug">
div
  //- CmpAgregar(ref="cmpAgregar" :data="filaSeleccionada")
  //- CmpEliminar(ref="cmpEliminar")
  v-container.pa-3(fluid)
    v-row.mb-2(dense align="center")
      v-col.gap-0.align-center.justify-star(cols="5")
        v-btn(color="cyan-accent-4" variant="tonal" prepend-icon="mdi-archive-plus-outline" @click="dialogAdd('add')") Consolidado
      v-spacer
      v-col.gap-10.align-center(cols="2")
        div.w200
          VFiltroInput(v-model="filtro" placeholder="Filtrar resultados..." )
        v-btn(color="success" variant="tonal" prepend-icon="mdi-refresh" @click="loadData()") Refrescar

    v-row(dense)
      v-col
        agGrid(
          row-height="100"
          :column-defs="columnDefs"
          :filtro="filtro"
          :data="rowData"
          row-selection="single"
          :suppress-copy-rows-to-clipboard="true"
          :suppress-row-click-selection="false"
          style="width: 100%; height: calc(100vh - 180px)"
          @grid-ready="readyTabla"
          @row-clicked="onRowClicked"
          )

</template>
