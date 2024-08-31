<script>
export default {
  name: 'ag-grid-component',
  inheritAttrs: false
}
</script>
<script setup>
import { ref } from 'vue'
import { localeEs } from './locale/ag-grid-locale-es'
import { $numeral } from '@/plugins'

import AgGridLoading from './components/loading.vue'

import headerCell from './renders/headerCell.vue'

import newNumericEditor from './editors/newEditorNumeric.vue'
import newPriceEditor from './editors/newEditorPrice.vue'

// import priceEditor from './editors/priceEditor.vue'
// import inputEditor from './editors/inputEditor.vue'

import highlight from '@/composables/highlight'

const props = defineProps({
  data: { type: Object, default: () => { } },
  columnDefs: { type: Array, default: () => [] },
  suppressRowClickSelection: { type: Boolean, default: true },
  filtro: { type: String, default: '' },
  editable: { type: Boolean, default: false }
})

const columnTypes = {
  filtrar: {
    cellRenderer: params => highlight(params.value, props.filtro)
  },

  codigo: {
    cellClass: 'text-caption align-center'
  },
  stock: {
    cellDataType: false,
    cellRenderer: params => $numeral(params.value).format('0,0'),
    valueFormatter: params => {
      if (!params.value) params.value = 0
      return params.value
    },
    cellClassRules: {
      'cell-cantidad': () => true,
      'cell-precio-minus': params => params.value < 0,
      'cell-precio-zero': params => params.value == 0 || params.value == null
    },
    comparator: (valueA, valueB) => valueA - valueB
  },

  precio: {
    cellDataType: false,
    cellRenderer: params => $numeral(params.value).format('0,0.00'),
    valueFormatter: params => {
      if (!params.value) params.value = 0
      return params.value
    },
    cellClassRules: {
      'cell-precio': () => true,
      'cell-precio-minus': params => params.value < 0,
      'cell-precio-zero': params => params.value == 0 || params.value == null
    },
    comparator: (a, b) => (parseFloat(a) == parseFloat(b) ? 0 : parseFloat(a) > parseFloat(b) ? 1 : -1)
  },

  campoEditableCantidad: {
    cellDataType: false,
    valueFormatter: params => {
      if (params.node?.rowPinned) {
        // console.log(params)
        if (params.node.rowIndex == 0) return $numeral(params.value).format('0,0')
        if (params.node.rowIndex == 1) return $numeral(params.value).format('0,0.000')
      }
      // if (!params.value) params.value = 0
      return $numeral(params.value).format('0,0')
    },
    cellEditor: newNumericEditor,
    cellClassRules: {
      'cell-editable': params => {
        if (params.node?.rowPinned) return false
        return params.colDef.editable()
      },
      'cell-strong': params => {
        if (params.node?.rowPinned) return true
        return false
      },
      'cell-cantidad': () => true,
      'cell-precio-minus': params => params.value < 0,
      'cell-precio-zero': params => params.value == 0 || params.value == null
    }
  },
  campoEditablePrecio: {
    // editable: params => props.editable,
    valueFormatter: params => $numeral(params.value).format('0,0.00'),
    cellEditor: newPriceEditor,
    cellClassRules: {
      'cell-editable': params => {
        if (params.node?.rowPinned) return false
        return params.colDef.editable()
      },
      'cell-precio': () => true,
      'cell-precio-minus': params => params.value < 0,
      'cell-precio-zero': params => params.value == 0 || params.value == null || params.value == undefined
    }
  },
  campoEditablePeso: {
    // editable: params => props.editable,
    valueFormatter: params => $numeral(params.value).format('0,0.00'),
    cellEditor: newPriceEditor,
    cellClassRules: {
      // 'cell-editable': params => params.colDef.editable == true,
      'cell-editable': params => {
        if (params.node?.rowPinned) return false
        return params.colDef.editable == true
      },
      'cell-precio': () => true,
      'cell-precio-minus': params => params.value < 0,
      'cell-precio-zero': params => params.value == 0 || params.value == null
    }
  },
  campoEditableTexto: {
    // 'cell-editable': params => params.colDef.editable == true,
    cellRenderer: params => highlight(params.value, props.filtro),
    // cellEditor: newInputEditor,
    cellClassRules: {
      'cell-editable': params => {
        if (params.node?.rowPinned) return false
        return params.colDef.editable == true
      },

      // 'cell-editable': params => params.colDef.editable == true,
      // 'cell-editable': () => props.editable,
      'cell-texto': () => true
    }
  }
}

const gridOptions = ref({
  loadingOverlayComponent: AgGridLoading,
  localeText: localeEs,
  columnDefs: [],
  headerHeight: 30,
  // rowBuffer: 200,
  rowHeight: 28,
  // enableCellChangeFlash: true,
  defaultColDef: {
    headerComponent: headerCell,
    editable: () => false,
    sortable: false,
    suppressMenu: true,
    resizable: false,
    type: 'filtrar',
    getQuickFilterText: params => params.value,
    suppressMovable: true,
    // comparator: (a, b) => (parseFloat(a) == parseFloat(b) ? 0 : parseFloat(a) > parseFloat(b) ? 1 : -1)
  }
})
</script>
<template lang="pug">
div
  ag-grid-vue.ag-theme-balham(
    :animate-rows="false"
    :suppress-row-click-selection="suppressRowClickSelection"
    :include-hidden-columns-in-quick-filter="true"
    :column-defs="columnDefs"
    :column-types="columnTypes"
    :grid-options="gridOptions"
    :suppress-group-rows-sticky="true"
    :row-data="data"
    v-bind="$attrs")
</template>
