<script>
export default { name: 'atencion-clientes-despacho-ruta-orden' }
</script>
<script setup>
// import { ref } from "vue"
import { useRoute } from 'vue-router'
const route = useRoute()


// TODO: datos desde la base de datos
const guias = [
  { guia: '5040012345', cliente: 'Juan Perez SAC', direccion: "CALLE LOS NARANJOS LA VICTO..." },
  { guia: '5040012346', cliente: 'Juan Perez SAC', direccion: "CALLE LOS NARANJOS LA VICTO..." },
  { guia: '5040012347', cliente: 'Juan Perez SAC', direccion: "CALLE LOS NARANJOS LA VICTO..." },
  { guia: '5040012401', cliente: 'Radiadores Unidos EIRL', direccion: "AV. PERU 1654 SANTA ANITA" },
  { guia: '5040012402', cliente: 'Radiadores Unidos EIRL', direccion: "AV. PERU 1654 SANTA ANITA" },
  { guia: '5200001234', cliente: 'Pepito Cañas', direccion: "AV. ARRIOLA 2298" },
  { guia: '5200001235', cliente: 'Pepito Cañas', direccion: "AV. ARRIOLA 2298" },
  { guia: '5200001236', cliente: 'Pepito Cañas', direccion: "AV. ARRIOLA 2298" },
  { guia: '5200001237', cliente: 'Pepito Cañas', direccion: "AV. ARRIOLA 2298" },
  { guia: '5200001238', cliente: 'Pepito Cañas', direccion: "AV. ARRIOLA 2298" },
  { guia: '5200001239', cliente: 'Pepito Cañas', direccion: "AV. ARRIOLA 2298" },
]

// let puntos = Object.groupBy(guias, ({ direccion }) => direccion)

let actual = ''
let puntos = []

guias.forEach(el => {
  if (actual !== el.direccion) puntos.push({ cliente: el.cliente, direccion: el.direccion, guias: [] })
  actual = el.direccion
})

puntos.forEach(punto => {
  let temp = guias.filter(item => item.direccion == punto.direccion)
  punto.guias = temp.map(item => item.guia)
})
</script>
<template lang="pug">
div.pa-4

  div.gap-10.align-center
    div.gap-3.flex-column
      span.text-h5 Orden: {{ route.params.id }}
    v-spacer
    v-btn(prepend-icon="mdi-arrow-left 10px" color="green" variant="tonal" :to="{name: 'atencion-clientes-despachos-ruta-asignada'}") Atras

  v-list(style="max-height: calc(100vh - 220px)")
    v-list-item.bg-boton.border.mb-1.rounded(v-for="(punto, key) of puntos" :key="key")
      div.gap-5.flex-column
        span.text-h5 Punto: {{ punto.direccion }}
        span.text-h6 Cliente: {{ punto.cliente }}
        pre.text-caption Cantidad Guias: {{ punto.guias.length }}
      template(#append)
        v-btn(:to="{name: 'atencion-clientes-despacho-ruta-guias', query: {orden: route.params.id, lista: punto.guias, cliente: punto.cliente, direccion: punto.direccion}}") Guias
</template>