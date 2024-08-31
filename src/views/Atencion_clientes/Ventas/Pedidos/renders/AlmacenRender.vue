<script setup>
defineProps({
  params: {
    type: Object,
    default: null
  }
})
</script>
<template lang="pug">
div.gap-5.flex-column.w-100.text-center.text-h6
  span {{ params.data.almacen }}
  //- span.text-catpion {{ params.data.F5_CGLOSA }}
</template>