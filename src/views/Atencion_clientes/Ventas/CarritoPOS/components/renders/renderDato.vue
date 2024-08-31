<script>
export default { name: 'cmp-reder-dato' }
</script>
<script setup>
// import { ref } from "vue"
defineProps({
  titulo: {
    type: String, default: ''
  },
  dato: {
    type: String, default: ''
  },
})
</script>
<template lang="pug">
tr
  td.label {{ titulo }}
  td.dato {{ dato }}
</template>
<style scoped>
.label,
.dato {
  /* font-family: 'Courier New', Courier, monospace; */
  letter-spacing: 0px;
}

.label {

  /* display: flex; */
  justify-content: end;

  padding: 4px 8px;
  background-color: rgb(236 236 236 / 0.6) !important;
  border-radius: 5px 0 0 5px;
  font-size: 11px;
  text-align: right;
  font-variation-settings: 'wght' 550;
  width: 110px;
}

.dato {
  padding: 2px 8px;
  font-size: 12px;
  /* width: 200px; */
  width: auto;
  color: black !important;
}
</style>