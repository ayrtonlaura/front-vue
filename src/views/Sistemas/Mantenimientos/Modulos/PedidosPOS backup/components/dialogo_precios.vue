<script>
export default { name: 'sistemas-mant-pedidos-pos-dialogo-precios' }
</script>
<script setup>
import { ref } from "vue"
const lista_precios = ref([
  { id: '0', descripcion: 'LIM PRECIO PREIMUM' }
])
</script>
<template lang="pug">
v-container
  v-row(dense)
    v-col
      //- div.text-h6 ✅ Component sistemas-mant-pedidos-pos-dialogo-precios
      v-select( label="Lista de Precios" :items="lista_precios")
      div
        v-checkbox(label="PUBLICO FINAL")
        v-checkbox(label="DISTRIBUIDOR")
        v-checkbox(label="FLOTA")
        v-checkbox(label="SUPERMERCADOS")
        v-checkbox(label="TALLER")
</template>