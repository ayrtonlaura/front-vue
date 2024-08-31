<script setup>
import { ref } from 'vue';

const show = ref(false)

const columnDefs = ref([
  { field: 'codigo', headerName: 'Código', width: 90, cellClass: ['justify-center', 'text-caption'], headerComponent: null, sortable: false },
  { field: 'descripcion', headerName: 'Descripción', flex: 1, sortable: false, headerComponent: null },
  { field: 'cantidad', headerName: 'Cant.', width: 70, type: 'stock', headerComponent: null, sortable: false },
])

const data = ref([
  { codigo: 'code1', descripcion: 'producto 1', cantidad: 5 },
  { codigo: 'code2', descripcion: 'producto 2', cantidad: 15 },
  { codigo: 'code3', descripcion: 'producto 3', cantidad: 51 },
  { codigo: 'code4', descripcion: 'producto 4', cantidad: 3 },
])

const readyGrid = () => { }

const ver_detalles = (item) => {
  console.log("onVerDetalles()", item);
  show.value = true
}

defineExpose({ ver_detalles })
</script>
<template lang="pug">
v-dialog(v-model="show" width="600")
  v-btn.px-4(
    style="position: absolute; top: -32px; right: 0; z-index: 999;" 
    color="amber" rounded prepend-icon="mdi-window-close"
    @click="show = false" 
    ) Cerrar
  v-card
    v-card-text.pa-3
      div.gap-10
        div.gap-5.flex-column
          div.gap-10.align-center
            span.text-h3 Guía 9010067682
            span.text-h6 (23/01/2024)
          span.text-h6 Almacen: 6001 - PIU SANCHEZ CERRO 1222

        v-spacer

        div.gap-5.flex-column.text-right
          span.text-h3 Ref: BV B9010006410
          span.text-h6 Vendedor: MILAGROS DEL PILAR ENCALADA GIRON

      div.gap-5.flex-column.my-2
        div.gap-10.align-center
          span.x-label Cliente:
          span.text-h6 CALLE CORTEZ ERALIO
        div.gap-10.align-center
          span.x-label Destino:
          span.text-h6 CALLE PUERTO RICO 19-13

      agGrid.my-2(
        @grid-ready='readyGrid'
        :columnDefs="columnDefs"
        :includeHiddenColumnsInQuickFilter='true'
        :rowData="data"
        style='width:100%; height:250px'
        )
        //- :rowHeight="42"

      div.gap-5.my-1
        div.gap-10.align-center.flex-fill.w50
          span.x-label Glosa:
          span.text-h6 01 - VENTA

        div.gap-10.align-center.flex-fill.w50
          span.x-label Movimiento:
          span.text-h6 01 - GUIA CONTRA FACTURA

      div.gap-5
        div.gap-10.align-center.flex-fill.w50
          span.x-label Usuario:
          span.text-h6 MPEG - MILAGROS DEL PILAR ENCALADA GIRON
        div.gap-10.align-center.flex-fill.w50
          span.x-label Fec. Emisión:
          span.text-h6 23/01/2024 09:47:38
</template>
<style scoped>
.x-label {
  font-size: 11px;
  background-color: #e5eaf1;
  border-radius: 3px;
  width: 80px;
  min-width: 80px;
  text-align: right;
  padding: 2px 4px;
}
</style>