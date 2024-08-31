<script setup>
import { ref, defineEmits, defineProps } from 'vue'

const enRuta = ref(false)
const mostrarIcono = ref(true)
const mostrarEnRuta = ref(false)
// const rutaDeshabilitada = ref(false)
const props = defineProps(['item', 'indice'])
const emit = defineEmits(['verInfoProducto1'])

const acortarText = text => {
  return text.length > 21 ? `${text.substring(0, 21)}...` : text
}
const aceptarEnRuta = index => {
  // console.log('Haciendo clic en aceptarEnRuta para el índice  :', index)

  mostrarIcono.value = false
  enRuta.value = false
  mostrarEnRuta.value = true
}
const verInfoProducto = index => {
  emit('verInfoProducto1', index)
}
</script>
<template lang="pug">

div
  v-card.pa-4.pb-0(:disabled="item.estado == 'no entregado'")
    div.gap-5.justify-space-between.align-center
      div.gap-12.justify-space-between.align-center
        v-btn(color="blue-grey" variant="tonal" icon="mdi-timer-sand" v-if="mostrarIcono" size="16" :class="{ rotating: mostrarIcono }")
        v-btn(color="red" variant="tonal" icon="mdi-car-arrow-right" v-else="mostrarEnRuta" size="16" ) 
        span.text-h4.font-weight-bold {{ acortarText(item.razonSocial) }}
      div.gap-20.justify-space-between.align-center
        v-btn(color="blue" @click="enRuta = true" :disabled="mostrarEnRuta") En ruta

        v-dialog(v-model="enRuta")
          v-card
            v-card-title.pt-5.text-h5.text-center.font-weight-bold
              |En ruta 
            div.mx-auto.w-50.text-h5.text-center
              |Confirme los documentos del grupo para colocarlo en ruta
            v-card-actions.gap-20.justify-center
              v-btn(variant="flat" @click="() => aceptarEnRuta(indice)") aceptar 
              v-btn(variant="flat"  @click="enRuta = false") cancelar
        
    div.mb-4
      div
        span.text-h4 {{ item.direccion }}
    div.px-4.pb-4(v-for="(guia, index) in item.guiasNro" )
      v-card(:disabled="guia.estado == 'entregado'")
        div.gap-10.justify-space-between.align-center
          span.text-h4.font-weight-bold {{ guia.numero }}
          
        div.gap-10.justify-space-between.align-center
          span.text-h6 {{ guia.productosTotal }} Productos
          v-btn(color="green-lighten-1" @click="verInfoProducto(index)"  ) Ver más *

</template>

<style lang="scss">
.bg-scroll {
  background-color: #f7faff;
}
@keyframes rotate {
  to {
    transform: rotate(360deg);
  }
}
.rotating {
  animation: rotate 2s infinite linear;
}
</style>
