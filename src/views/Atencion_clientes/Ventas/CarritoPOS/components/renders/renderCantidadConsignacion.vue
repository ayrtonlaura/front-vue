<script setup>
const props = defineProps(['params'])
function detalles() {
  props.params.detalles(props.params.data);
}
</script>

<template lang="pug">
template(v-if="params.value == 0")
  span 0
template(v-else)
  div.a-detalles.gap-10.align-center(@click="detalles()")
    span {{ params.value }}
    i.mdi.mdi-open-in-new.mdi-8px
</template>
  
<style>
.a-detalles {
  color: black;
  font-variation-settings: 'wght' 550;
  background-color: rgba(0 0 0 / 0.05);
  padding: 1px 8px 0px 8px;
  line-height: 20px;
  border-radius: 10px;
  cursor: pointer;
  transition: all ease .2s;
}

.a-detalles:hover {
  background-color: rgba(255, 208, 0, 0.4);
  text-decoration: underline;
}
</style>