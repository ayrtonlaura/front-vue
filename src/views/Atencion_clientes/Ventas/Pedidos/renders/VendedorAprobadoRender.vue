<script setup>
defineProps({
  params: {
    type: Object,
    default: null
  }
})
</script>
<template lang="pug">
span.text-wrap.line-15 
  span {{ params.data.VE_CNOMBRE }}
</template>
