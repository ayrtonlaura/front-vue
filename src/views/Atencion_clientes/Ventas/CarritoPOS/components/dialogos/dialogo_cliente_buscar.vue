<script>
export default { name: 'cmp-dialogo-cliente-buscar' }
</script>
<script setup>
import { ref, inject, watch } from "vue"
import clienteRender from '../renders/renderCliente'
const show = ref(false)
const { busqueda, buscar, tipos_cliente, isLoading } = inject('prov_clientes')
const { carrito } = inject('prov_carrito')


const gridApi = ref();
const columnDefs = ref([
  // { field: 'id' },
  {
    field: 'nombre', flex: 1,
    cellRenderer: clienteRender,
    cellRendererParams: () => {
      return {
        // filtro: filtro.value,
        clicked: params => {
          // console.log(params);
          Object.assign(carrito.cliente, params)
          show.value = false
        }
      }
    },

    cellStyle: { padding: '0 4px' }
    // cellRenderer: params => {
    //   return 'Value is ' + params.value
    // }
  },
]);

const filtro = ref("");
const readyGrid = (params) => gridApi.value = params.api;

watch(filtro, async (newValue) => {
  gridApi.value.setGridOption("quickFilterText", newValue);
  gridApi.value.redrawRows();
});

defineExpose({ show })
</script>
<template lang="pug">
v-dialog(v-model="show" width="650")
  v-card
    v-toolbar(density="compact")
      span.text-h5.ml-3 Búsqueda de cliente
      v-spacer
      v-btn(icon="mdi-window-close mdi-20px" size="32" @click="show = false")
    v-card-text.pa-3
      div.gap-10.align-center
        div.w105
          v-select(
            v-model="busqueda.tipo"
            :disabled="isLoading" 
            label="Tipo Doc." :items="tipos_cliente" :return-object="false" placeholder="Elegir opción"
          )

        v-text-field(
          v-model="busqueda.q" label="Buscar cliente" placeholder="RUC / DNI / Razón social / Nombres"
          :loading="isLoading"
          :disabled="isLoading" 
          @keyup.enter="buscar()"
        )
        v-btn(prepend-icon="mdi-magnify" variant="tonal" :loading="isLoading" @click="buscar()") Buscar

      agGrid.noHeader.my-2(
        :column-defs="columnDefs"
        :data="busqueda.resultados"
        :filtro="filtro"
        :row-height="50"
        style="width: 100%; height: calc(100vh - 300px)"
        @grid-ready="readyGrid"
        )

      div.gap-10.justify-space-between.align-center
        div.w250
          v-filtro-input(v-model="filtro" placeholder="Fitlrar...")
        span.text-caption Resultados: {{ busqueda.resultados.length }}
</template>