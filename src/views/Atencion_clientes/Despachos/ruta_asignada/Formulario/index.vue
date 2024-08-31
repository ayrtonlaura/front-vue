<script>
export default { name: 'atencion-clientes-despacho-ruta-formulario' }
</script>
<script setup>
// import { ref } from "vue"
import { onMounted } from "vue";
import { reactive } from "vue";
import { useRoute, useRouter } from 'vue-router'
const route = useRoute()
const router = useRouter()

const data = reactive({
  orden: route.query.orden,
  guia: route.query.guia,
  cliente: route.query.cliente,
  direccion: route.query.direccion,
  estado: null,
  notas: '',
  fecha_actualizacion: null,
  usuario_actualiza: null
})

onMounted(async () => {
  await new Promise(r => setTimeout(r, 1500));

  let bd = {
    estado: 'E',
    notaas: 'Esta es la nota'
  }

  data.estado = 'E'
  data.notas = 'Esta es la nota'
  data.fecha_actualizacion = new Date
  data.usuario_actualiza = 'LMVN'

  // -- Object
})
</script>
<template lang="pug">
div.pa-4.gap-10.flex-column

  div.gap-10.align-center
    div.gap-3.flex-column
      span.text-h5 Orden: {{ data.orden }}
      span.text-h4 {{ data.guia }}
    v-spacer
    v-btn(prepend-icon="mdi-arrow-left 10px" color="green" variant="tonal" @click="router.go(-1)") Atras

  div.gap-10.flex-column
    span.text-caption Cliente: {{ data.cliente }}
    span.text-caption Direccion: {{ data.direccion }}

  div.gap-10.justify-space-around
    v-btn-toggle(v-model="data.estado" mandatory color="primary")
      v-btn(size="large" value="E") Entregado
      v-btn(size="large" value="P") Entrega parcial
      v-btn(size="large" value="R") Rechazado

  div.gap-10.my-3
    v-textarea(v-model="data.notas" rows="3" label="Notas" no-resize variant="outlined")

  div.gap-10

    v-btn.mx-auto.px-6(color="success" append-icon="mdi-content-save" rounded) Guardar
  pre.text-caption {{ data }}
</template>