<script>
export default { name: 'cmp-btn-tipo-cambio' }
</script>
<script setup>
import { $numeral } from '@/plugins';
// import { inject } from 'vue';

// const { loadTipoCambio } = inject('prov_carrito')

defineProps({
  loading: { type: Boolean, default: false },
  valor: { type: Number, default: 0 }
})
</script>
<template lang="pug">
div

  div(v-if="loading")
    div.loading
      span.text-deep-purple Tipo de cambio
      div.w30: v-progress-linear.my-2(color="deep-purple-accent-4" indeterminate rounded height="5")

  template(v-if="!loading")
    div.tipo(v-if="valor != 0") TC: 
      span.font-weight-bold {{ $numeral(valor).format('0.000') }}
    div.tipo.error(v-if="valor == 0") 
      span.text-error No se establecido TC para hoy
      //- span ⚠️ TC: 0.00 - <u>Sólo dólares</u>
      //- v-btn.ml-2(icon="mdi-sync" variant="tonal" size="26" @click="loadTipoCambio")

</template>
<style scoped>
.loading {
  height: 30px;
  line-height: 30px;
  display: flex;
  font-size: 12px;
  align-items: center;
  gap: 10px;
  border: 1px dotted #bbb;
  border-radius: 6px;
  padding: 0 8px;
}

.tipo {
  border-radius: 6px;
  padding: 0 8px;
  height: 30px;
  line-height: 30px;
  font-size: 12px !important;
  background-color: #546E7A !important;
  color: white;
}

.tipo.error {
  background-color: #B0BEC5 !important;
  padding-right: 6px;
}
</style>