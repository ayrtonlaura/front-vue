<script>
export default { name: 'atencion-clientes-despacho-guias' }
</script>
<script setup>
// import { ref } from "vue"
import { useRoute } from 'vue-router'
const route = useRoute()

// TODO: datos desde la base de datos

</script>
<template lang="pug">

div.pa-4

  div.gap-10.align-center
    div.gap-3.flex-column
      span.text-h5 Orden: {{ route.query.orden }}
      span.text-caption Cliente: {{ route.query.cliente }}
      span.text-caption Direccion: {{ route.query.direccion }}
    v-spacer
    v-btn(prepend-icon="mdi-arrow-left 10px" color="green" variant="tonal" :to="{name: 'atencion-clientes-despacho-ruta-orden', params: {id: route.query.orden}}") Atras

  v-list(style="max-height: calc(100vh - 220px)")
    v-list-item.bg-boton.border.mb-1.rounded(v-for="(punto, key) of route.query.lista" :key="key")
      div.gap-5.flex-column
        span.text-h5 Guia: {{ punto }}
      template(#append)
        v-btn(:to="{name: 'atencion-clientes-despacho-ruta-formulario', query: {orden: route.query.orden, cliente: route.query.cliente, direccion: route.query.direccion, guia: punto}}") Guias



</template>