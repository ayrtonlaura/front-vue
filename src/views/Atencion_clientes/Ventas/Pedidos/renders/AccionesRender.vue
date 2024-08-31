<script setup>
defineProps({
  params: {
    type: Object,
    default: null
  }
})
</script>
<template lang="pug">
div.gap-7.w-100.px-1.justify-center.align-center
  v-btn(@click="params.editar()" variant="outlined" icon="mdi-file-edit" color="amber" size="26") 
  v-btn(@click="params.eliminar()" variant="outlined" icon="mdi-delete" color="red" size="26") 
  v-btn(@click="params.pedido_pdf()" variant="outlined" icon="mdi-printer" color="blue" size="26") 
  //- i.cursor-pointer.mdi.mdi-file-edit-outline.mdi-20px.rounded-circle.bg-amber-lighten-4.text-black(
    style="min-height: 30px !important; min-width: 30px !important; line-height: 30px !important"
    @click="params.editar()")

  //- i.cursor-pointer.mdi.mdi-delete-outline.mdi-20px.rounded-circle.bg-red-lighten-5.text-black(
    style="min-height: 30px !important; min-width: 30px !important; line-height: 30px !important"
    @click="params.eliminar()")

  //- i.cursor-pointer.mdi.mdi-printer-outline.mdi-20px.rounded-circle.bg-blue.text-white(
    style="min-height: 30px !important; min-width: 30px !important; line-height: 30px !important"
    @click="params.pedido_pdf()")

</template>
