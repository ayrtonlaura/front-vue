<script setup>
import { ref, reactive, toRaw } from 'vue'
import { $moment } from '@/plugins';
import render_cell_orden from '../renders/render_cell_orden.vue';

import { despachos_orden_model } from '@/models'
import { watch } from 'vue';

const m_ordenes = new despachos_orden_model()

// const props =
defineProps({
  choferes: { type: Array, default: null }
})

const mostrar = ref(false)
const data = ref([])
const filtro = ref('')
const gridApi = ref()

const busqueda = reactive({
  chofer: null,
  fecha: [$moment().utc(-5).startOf('month'), $moment().utc(-5).endOf('month')]
})

const readyGrid = (params) => { gridApi.value = params.api }

const columnas = [
  { field: 'numeracion', hide: true },
  { field: 'fecha', hide: true },
  { field: 'chofer', hide: true },
  { field: 'estado', hide: true },
  {
    field: 'numeracion', flex: 1, cellRenderer: render_cell_orden,
    cellRendererParams: params => {
      return {
        filtro: filtro.value,
        seleccionar: () => {
          console.log("detalles", params.data);
        },

      }
    },
    cellStyle: { display: 'inline-block', padding: '0' }
  }
]

async function buscar() {

  console.log(busqueda);
  console.log(toRaw(busqueda));


  data.value = []
  data.value = await m_ordenes.listar(toRaw(busqueda))
}

function show() {
  mostrar.value = true
}

watch(filtro, async (newValue) => {
  gridApi.value.setGridOption('quickFilterText', newValue)
  gridApi.value.redrawRows()
})

defineExpose({ show })
</script>
<template lang="pug">
v-dialog(v-model="mostrar" eager width="500")
  v-card
    v-card-title.py-1.px-3
      div.gap-10.justify-space-between.align-center
        span.text-h5 Selección de Ordenes
        v-spacer
        v-btn(variant="tonal" size="x-small" icon="mdi-window-close" color="grey-darken-1" @click="mostrar = false")
    v-divider
    v-card-text.pa-0
      v-container.pa-3
        v-row(dense)
          v-col(cols="12")
            div.gap-10
              v-select(v-model="busqueda.chofer" label="Chofer" :items="choferes" item-value="id" item-title="nombre" placeholder="- TODOS -" :return-object="false" clearable)
              v-fecha.w220(v-model="busqueda.fecha" titulo="Fecha")
              v-btn.px-3(append-icon="mdi-magnify" rounded @click="buscar()") Buscar

            agGrid.noHeader.my-2(
              :column-defs="columnas"
              :data="data"
              :suppress-row-click-selection="true"
              :row-multi-select-with-click="false"
              :include-hidden-columns-in-quick-filter="true"
              row-selection="multiple"
              :row-height="45"
              style="width: 100%; height: calc(100vh - 250px)"
              @grid-ready="readyGrid")

            div.w250
              v-filtro-input(v-model="filtro" placeholder="Fitlrar...")

</template>
