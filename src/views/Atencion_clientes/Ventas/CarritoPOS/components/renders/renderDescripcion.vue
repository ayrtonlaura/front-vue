<script setup>
import highlight from '@/composables/highlight'
const props = defineProps({
  params: {
    type: Object,
    default: null
  }
})
const formato = () => {
  let str = props.params.value.replace("NTCO: ", "")
  return highlight(str, props.params.filtro)
}
</script>
<template lang="pug">
div.gap-8.align-center.w-100
  //- v-btn(size="20" icon="mdi-plus mdi-16px" color="blue-lighten-4" style="margin-bottom:2px" @click="params.clicked(params.data)")
  i.btn-mas.mdi.mdi-information-outline.mdi-16px.text-blue.bg-blue-lighten-4(@click="params.detalles(params.data)")
  div.text-h6
    span.line-16(v-html="formato()")
  v-spacer
  v-chip.w40.text-caption.justify-center(v-if="params.data.en_liquidacion == 'S'" density="compact" color="success" variant="flat") Liqui
  v-chip.w50.text-caption.justify-center(v-if="params.data.en_promocion == 'S'" density="compact" color="amber" variant="flat") Promo

  i.btn-agregar.mdi.mdi-cart-plus.mdi-16px.bg-amber-lighten-2(@click="params.clicked(params.data)")
</template>
<style>
.btn-mas,
.btn-agregar {
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50% !important;
}

.btn-mas {
  line-height: 20px !important;
  min-height: 22px !important;
  min-width: 22px !important;
}

.btn-agregar {
  line-height: 28px !important;
  min-height: 28px !important;
  min-width: 28px !important;
}
</style>
