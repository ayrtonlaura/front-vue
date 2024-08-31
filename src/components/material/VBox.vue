<script>
export default { name: 'cmp-vbox' }
</script>
<script setup>
import { computed } from 'vue'
const props = defineProps({
  tipo: {
    type: String,
    default: 'normal'
  },
  boton: {
    type: String,
    default: 'buscar'
  }
})

const titulo = computed(() => {
  if (props.tipo == 'inicial') return 'Aún no buscas nada'
  if (props.tipo == 'loading') return 'Buscando información...'
  if (props.tipo == 'no-data') return 'Sin información'
  return 's'
})

const subtitulo = computed(() => {
  if (props.tipo == 'inicial') return `Haz click en el botón <u>${props.boton}</u> para consultar los registros`
  if (props.tipo == 'loading') return 'Espere un momento'
  if (props.tipo == 'no-data') return 'Aún no tenemos datos para mostrar'
  return 'ss'
})
</script>
<template lang="pug">
v-fade-transition
  div.flex-column.gap-6.justify-center.align-center.text-center.w-75.mx-auto.border.pa-4.rounded.text-black(:class="tipo=='loading' ? 'bg-amber-lighten-5': 'boton'")
    v-icon.mdi-30px.text-blue(v-if="tipo=='inicial'") mdi-cursor-default-click-outline
    v-icon.mdi-30px(v-if="tipo=='no-data'") mdi-inbox-remove-outline
    v-progress-circular.mb-1(v-if="tipo=='loading'" size="26" width="2" indeterminate color="amber")

    span.text-black.font-weight-bold.text-h5(v-html="titulo")
    span.text-black.text-h6(v-html="subtitulo")
</template>