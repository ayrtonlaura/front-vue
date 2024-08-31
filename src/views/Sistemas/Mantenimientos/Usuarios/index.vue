<script>
export default { name: 'sistemas-mantenimientos-usuarios' }
</script>
<script setup>
import { ref } from 'vue'

import { LineasProductosModel } from '@/models'

const m_lineas_productos = new LineasProductosModel()

const marcas = ref([
  {
    id: 'ACC',
    descripcion: 'ACCELERA',
    detalles: {
      widgests: 'widgests',
      dashboard: 'Dashboard',
      dashboardB: 'Dashboard B'
    }
  },
  {
    id: 'ACT',
    descripcion: 'ACTIVE',
    detalles: {
      widgests: 'widgests',
      dashboard: 'Dashboard',
      dashboardB: 'Dashboard B'
    }
  },
  {
    id: 'ADD',
    descripcion: 'ADDO',
    detalles: {
      widgests: 'widgests',
      dashboard: 'Dashboard',
      dashboardB: 'Dashboard B'
    }
  },
  {
    id: 'ADV',
    descripcion: 'ADVANCE',
    detalles: {
      widgests: 'widgests',
      dashboard: 'Dashboard',
      dashboardB: 'Dashboard B'
    }
  },
  {
    id: 'ADT',
    descripcion: 'ADVANTI',
    detalles: {
      widgests: 'widgests',
      dashboard: 'Dashboard',
      dashboardB: 'Dashboard B'
    }
  },
  {
    id: 'AEO',
    descripcion: 'AEOLUS',
    detalles: {
      widgests: 'widgests',
      dashboard: 'Dashboard',
      dashboardB: 'Dashboard B'
    }
  },
  {
    id: 'AGR',
    descripcion: 'AGRALE MODASA',
    detalles: {
      widgests: 'widgests',
      dashboard: 'Dashboard',
      dashboardB: 'Dashboard B'
    }
  }
])

const gridApi = ref()

const readyGrid = async params => {
  gridApi.value = params.api
  lineas.value = await m_lineas_productos.listar({ empresa: 1 })
}

const selectedRow = ref({})

const lineas = ref()

const columnas = ref([
  { headerName: 'Codigo', field: 'id', width: 90, cellClass: 'justify-center' },
  { headerName: 'Nombre de usuario', field: 'descripcion', flex: 1, sortable: true }
])

const columnas_lineas = [{ field: 'grupo', rowGroup: true, hide: true }]

const autoGroupColumnDef = ref({
  sortable: false,
  headerName: 'Descripcion',
  field: 'linea',
  flex: 1,
  cellRenderer: 'agGroupCellRenderer',
  cellRendererParams: {
    checkbox: true
  }
})

const onSelectionChanged = () => {
  let rowSel = gridApi.value.getSelectedRows()
  if (rowSel) selectedRow.value = rowSel[0]
}
</script>
<template lang="pug">
v-container.pa-1(fluid)
  v-row(dense)
    v-col.sboton.rounded.pa-2(cols="4")
      agGrid(
        style="width: 100%; height: calc(100vh - 150px);"
        class="ag-theme-alpine"
        :column-defs="columnas"
        :row-data="marcas"
        row-selection="single"
        :suppress-row-click-selection="false"
        @grid-ready="readyGrid"
        @selection-changed="onSelectionChanged"
        )

    v-col.pa-2(cols="5")
      div.text-h6.py-2 Selection: {{ selectedRow.descripcion }}
      agGrid(
        :auto-group-column-def="autoGroupColumnDef"
        :column-defs="columnas_lineas"
        :data="lineas"
        :group-selects-children="true"
        row-selection="multiple"
        style="width: 100%; height: calc(100vh - 150px)"

        )
    v-col(cols="3")
      div.ma-2.border.rounded.px-5.py-3
        div.gap-10.align-center
          span.text-h5.pb-4 Formulario Usuario
        div.gap-10.pb-4
          v-text-field(label="Nombre")
          v-text-field(label="Apellido")
        div.gap-10.pb-4
          v-text-field(label="DNI")
          v-text-field(label="Telefono")
        div.gap-10.pb-4
          v-text-field(label="Edad")
          v-text-field(label="Correo")
        div.gap-10
          v-btn(@click="editProducto()") Confirmar      
</template>
