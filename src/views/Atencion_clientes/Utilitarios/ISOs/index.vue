<script>
export default { name: 'atencion-clientes-utilitarios-isos' }
</script>
<script setup>
import { ref, computed, watch } from 'vue'
import CellAction from './Render/CellAction.vue'
import CmpAgregar from './Render/CmpAgregar.vue'
import CmpEliminar from './Render/CmpEliminar.vue'

const grid = ref()
const rowData = ref([])
const filtro = ref('')
const filaSeleccionada = ref({})
const tipoFiltro = ref('iso')

const cmpAgregar = ref(null)
const cmpEliminar = ref(null)

const columnDefs = [
  { headerName: '#', cellClass: 'custom-cell', valueGetter: 'node.rowIndex + 1', width: 45 },
  { headerName: 'Tipo', field: 'tipo', type: 'filtrar', width: 120, filter: false },
  { headerName: 'Marca', field: 'marca', width: 100 },
  { headerName: 'Descripcion', field: 'descripcion', flex: 1, minWidth: 200 },
  { headerName: 'Publicacion', field: '', width: 100 },
  { headerName: 'Actualizacion', field: '', width: 80 },
  { headerName: 'ISO-OHSAS', field: 'archivo', width: 200 },
  {
    headerName: 'Acciones',
    width: 180,
    cellRenderer: CellAction,

    cellRendererParams: params => {
      return {
        editar: () => {
          console.log('CellAction Editar', params.data)
          cmpAgregar.value.show()
        },
        eliminar: () => {
          console.log('CellAction ELIMINAR')
          cmpEliminar.value.show()
        },
        descargar: () => {
          const link = document.createElement('a')
          link.href = params.data.archivo
          link.target = '_blank'
          link.download = 'download'
          document.body.appendChild(link)
          link.click()
          document.body.removeChild(link)
        }
      }
    },

    cellStyle: {
      padding: '0'
    }
  }
]

const rowData_cmp = computed(() => {
  let v = rowData.value
  let filtro = tipoFiltro.value
  console.log(filtro + ' Filtro')
  return filtro !== '' ? v.filter(item => item.tipo == filtro) : v
})
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

  grid.value.hideOverlay()
}

const readyTabla = async params => {
  grid.value = await params.api
  loadData()
}

const onRowClicked = params => {
  filaSeleccionada.value = params.data
}

const dialogAdd = () => {
  filaSeleccionada.value = null
  cmpAgregar.value.show()
}

watch(filtro, async newQuestion => {
  grid.value.setQuickFilter(newQuestion)
  grid.value.redrawRows()
})
</script>
<template lang="pug">
div
  CmpAgregar(ref="cmpAgregar" :data="filaSeleccionada")
  CmpEliminar(ref="cmpEliminar")
  v-container.pa-3(fluid)
    v-row.mb-2(dense align="center")
      v-col.gap-10.align-center(cols="2")
        div.w200
          VFiltroInput(v-model="filtro" placeholder="Filtrar resultados..." )
        v-btn(color="success" prepend-icon="mdi-refresh" @click="loadData()") Refrescar
      v-spacer
      v-col.gap-0.align-center.justify-end(cols="8")
        v-btn(color="cyan" prepend-icon="mdi-archive-plus-outline" @click="dialogAdd('add')") Agregar
        v-spacer
        span.text-h5.font-weight-bold Tipo de archivo:
        v-radio-group(v-model="tipoFiltro" inline hide-details)
          v-radio(label="ISO-OHSAS" value="iso")
          v-radio(label="Catalogo" value="catalogo")
          v-radio(label="Ficha tecnica" value="Infinix")
          v-radio(label="Camiones" :value="4")
          v-radio(label="Seguimiento" value="seguimiento")
          v-radio(label="- Todos -" value="")
    v-row(dense)
      v-col
        agGrid(
          row-height="40"
          :column-defs="columnDefs"
          :data="rowData_cmp"
          :filtro="filtro"
          row-selection="single"
          :suppress-copy-rows-to-clipboard="true"
          :suppress-row-click-selection="false"
          style="width: 100%; height: calc(100vh - 180px)"
          @grid-ready="readyTabla"
          @row-clicked="onRowClicked"
          )

</template>
