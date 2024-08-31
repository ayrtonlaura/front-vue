<script setup>
import { ref, defineEmits, defineProps } from 'vue'

import imgUrl from '@/assets/img/hourglass-time.gif'

const enRuta = ref(false)
const mostrarIcono = ref(true)
const mostrarEnRuta = ref(false)
// const rutaDeshabilitada = ref(false)

const props = defineProps(['item', 'indice'])

const emit = defineEmits(['verGuia'])

const acortarText = text => {
  return text.length > 21 ? `${text.substring(0, 21)}...` : text
}
const aceptarEnRuta = index => {
  // console.log('Haciendo clic en aceptarEnRuta para el índice  :', index)

  mostrarIcono.value = false
  enRuta.value = false
  mostrarEnRuta.value = true
}

// const verInfoProducto = index => {
//   emit('verInfoProducto1', index)
// }
</script>

<template lang="pug">
div
  v-dialog(v-model="enRuta" width="300")
    v-card
      v-card-title.pt-5.text-h5.text-center.font-weight-bold En ruta 
      div.mx-auto.w-50.text-h5.text-center Confirme los documentos del grupo para colocarlo en ruta
      v-card-actions.gap-20.justify-center
        v-btn(variant="flat" @click="() => aceptarEnRuta(indice)") aceptar 
        v-btn(variant="flat"  @click="enRuta = false") cancelar

  v-card.pa-2.border(flat :disabled="item.estado == 'no entregado'")

    div.gap-5.justify-space-between.align-center
      div.gap-12.justify-space-between.align-center

        v-btn(color="blue-grey" variant="tonal" icon="mdi-timer-sand mdi-spin mdi-20px" v-if="mostrarIcono" size="30")
          template(v-slot)
            img(:src="imgUrl" width="16")
        v-btn(color="red" variant="tonal" icon="mdi-car-arrow-right mdi-20px" v-else="mostrarEnRuta" size="30" ) 
        span.text-h5.font-weight-bold {{ acortarText(item.razonSocial) }}
      v-btn(color="blue" @click="enRuta = true" :disabled="mostrarEnRuta") En ruta

    div.mb-2
      span.text-h5 {{ item.direccion }}

    template(v-for="(guia, index) in item.guiasNro" )
      div.px-4.pb-1
        v-card.py-1.px-2.border(flat :disabled="guia.estado == 'entregado'")

          div.gap-10.justify-space-between.align-center
            div.gap-3.flex-column
              span.text-h4.font-weight-bold {{ guia.numero }}
              span.text-h6 {{ guia.productosTotal }} Productos

            v-btn(color="green-lighten-1" @click="emit('verGuia', {guia, indice, index})") Ver más

</template>
