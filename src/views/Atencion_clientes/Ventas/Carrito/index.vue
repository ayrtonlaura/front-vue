<script>
export default { name: 'atencion-clientes-ventas-carrito' }
</script>

<script setup>
import { ref } from 'vue';
const texto = ref('')
</script>

<template lang="pug">
div
  div Compoment carrito
  v-text-field(v-model="texto" label="Texto")
</template>