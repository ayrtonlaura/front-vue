<script setup>
import { ref, watch } from 'vue'
import { StockModel } from '@/models'

const m_stock = new StockModel()

const isLoading = ref(false)
const show = ref(false)
const item = ref(null)
const rowData = ref([])
const filtro = ref('')
const gridApi = ref(null)

const readyTabla = params => gridApi.value = params.api

const columnDefs = [
  {
    headerName: 'Ciudad',
    field: 'ciudad',
    width: 90,
    cellClass: ['justify-center', 'text-caption', 'text-truncate']
  },
  {
    headerName: 'Agencia',
    field: 'agencia',
    width: 140,
    cellStyle: { display: 'inline-block', fontSize: '11px' },
    cellClass: ['text-truncate']
  },
  {
    headerName: 'Almacen',
    field: 'almacen',
    flex: 1,
    cellStyle: { display: 'inline-block' },
    cellClass: ['text-truncate']
  },
  {
    headerName: 'Stock',
    field: 'cantidad',
    width: 60,
    cellStyle: { fontSize: '13px' },
    cellClass: ['justify-center', 'font-weight-bold']
  }
]

watch(filtro, async (newQuestion) => {
  gridApi.value.setGridOption('quickFilterText', newQuestion)
  gridApi.value.redrawRows()
})

async function mostrar(data) {

  console.log(data);

  filtro.value = ''
  gridApi.value.resetColumnState();

  item.value = data.params
  show.value = true

  isLoading.value = true
  gridApi.value.setGridOption('rowData', [])
  gridApi.value.showLoadingOverlay()

  rowData.value = await m_stock.stock_nacional({
    empresa: data.empresa,
    // base: data.base,
    agencia: data.agencia,
    codigo: data.params.producto_codigo,
    tipo: data.tipo
  }).finally(() => {

    gridApi.value.hideOverlay()
    isLoading.value = false
  });

  gridApi.value.hideOverlay()
  isLoading.value = false
}

function cerrar() {
  show.value = false
}

function getRowClass(params) {
  if (params.data.tipo == "C") {
    return 'bg-amber-lighten-4';
  }
}

defineExpose({ mostrar })
</script>
<template lang="pug">
v-dialog(scrollable v-model="show" eager persistent no-click-animation width="650")
  v-card
    v-toolbar( dense height="46" class="pl-4 pr-0")
      span.text-h5 Detalle por agencia
      v-spacer
      v-btn(icon="mdi-window-close" size="30" @click="cerrar()")
    v-divider
    v-card-text.py-1.px-2
      div.gap-10.px-2.py-1.align-center.mb-1
        span.text-h6.bg-grey.rounded.py-1.px-2 {{ item?.producto_codigo }}
        span.text-h6 {{ item?.producto_descripcion }} {{ item?.descripcion2 }} 
      agGrid(
        :column-defs="columnDefs"
        :suppress-context-menu="true"
        :suppress-row-click-selection="false"
        :suppress-copy-rows-to-clipboard="true"
        :suppress-property-names-check="true" 
        :data="rowData"
        :filtro="filtro"
        :get-row-class="getRowClass"
        style="width: 100%; height: 350px"
        @grid-ready="readyTabla"
        )

      div.my-2.gap-0.justify-space-between
        div.pl-3.gap-10.align-center
          v-icon(color="amber-lighten-3" size="20") mdi-circle
          span.text-h6 Almacén de consignación
        div.w200.ml-auto
          v-filtro-input(v-model="filtro" placeholder="Filtrar resultados..")
</template>
