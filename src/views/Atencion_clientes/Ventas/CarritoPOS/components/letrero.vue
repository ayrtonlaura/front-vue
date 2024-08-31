<script>
export default { name: 'cmp-letrero' }
</script>
<script setup>
// import { ref } from "vue"

</script>
<template lang="pug">
div.letrero.gap-10.align-center.justify-space-between
  v-icon(color="white" size="16") mdi-alert-circle
  span.text-h6.text-white Cambio de precios sin previo aviso
  v-icon(color="white" size="16") mdi-alert-circle
</template>
<style scoped>
@keyframes example {
  0% {
    transform: translateY(0px);
  }

  10% {
    transform: translateY(-5px);
    /* background-color: yellow; */
  }

  20% {
    transform: translateY(0px);
    /* background-color: yellow; */
  }

  100% {
    transform: translateY(0px);
    /* background-color: yellow; */
  }
}

.letrero {
  padding: 5px 6px;
  position: absolute;
  bottom: 10px;
  background-color: red;
  border-radius: 10px;
  width: 100%;
  text-align: center;
  /* transform: translateY(-20px); */
  animation-name: example;
  animation-duration: 5s;
  /* animation-delay: 5s; */
  animation-iteration-count: infinite;
}

/* .datos {
  box-shadow: 0 0 2px 0 rgb(0 0 0 / .2);
  border-radius: 5px;
  padding: 7px;
  width: 230px;
} */
</style>