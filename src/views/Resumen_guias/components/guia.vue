<script setup>
import { reactive, toRaw } from 'vue'
const props = defineProps({
  numero: null,
})

const emit = defineEmits(['mensaje'])

const productos = Math.floor(Math.random() * 20)

const form = reactive({
  nombre: '',
  apellido: ''
})

function mensaje(index) {
  emit('mensaje', {
    index,
    datos: toRaw(form),
  })
}
</script>

<template lang="pug">
div.border.rounded.text-h6.pa-3.ma-2
  div.gap-20
    v-btn {{ numero }}
    v-btn {{ productos }}
    v-btn(@click="mensaje(numero)") Mostrar mensaje

  p Lorem ipsum dolor, sit amet consectetur adipisicing elit. Obcaecati cum quas reiciendis animi nam rerum. Cupiditate reprehenderit quia esse labore nemo. Ut qui esse fugiat nulla, provident minima alias ea.

  v-text-field(v-model="form.nombre" label="Nombre")

  template(v-for="item of productos")
    p productos {{item}}
</template>