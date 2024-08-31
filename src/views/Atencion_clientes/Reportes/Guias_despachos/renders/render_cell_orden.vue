<script setup>
import { $moment } from '@/plugins';
import highlight from '@/composables/highlight'
const props = defineProps({ params: {} })
const formato_highlight = (texto) => highlight(texto, props.params.filtro)
</script>

<template lang="pug">
div.gap-20.align-center(style="padding: 6px 10px;")
  div.gap-4.flex-column
    span.text-h5.font-weight-bold(v-html="formato_highlight(params.data.numeracion)")
    span.text-h6(v-html='formato_highlight($moment(params.data.fecha).format("DD/MMM/YYYY").replace(".", ""))')

  div.pl-3.gap-4.flex-column.flex-fill
    span.text-h6 Chofer: 
      span.text-primary(v-html="formato_highlight(params.data.chofer)")
    span.text-h6 Estado: 
      span.text-blue(v-html="formato_highlight(params.data.estado)")
  div
    v-btn(variant="tonal" color="amber" prepend-icon="mdi-check" @click="params.seleccionar()") Seleccionar
</template>