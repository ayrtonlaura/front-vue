<script>
export default { name: 'cmp-render' }
</script>
<script setup>
// import { ref } from "vue"

</script>
<template>
  <div class="gap-5 w-100 align-center" @dblclick="params.clicked(params.data)">
    <div class="gap-5 w-100 flex-column">
      <div class="gap-0 text-wrap" style="-webkit-line-clamp: 2; -webkit-box-orient: vertical;">
        <span class="text-h5 font-weight-bold">{{ params.data.nombre }}</span>
      </div>
      <span class="text-h6">RUC: {{ params.data.codigo }}</span>
    </div>
    <span style="flex-grow: 1"></span>
    <div class="gap-5 flex-column text-right">
      <span class="text-h6">Tipo: {{ params.data.tipo }}</span>
      <span class="text-h6">Vend: {{ params.data.vendedor }}</span>
    </div>
    <div class="px-1">
      <i class="cursor-pointer mdi mdi-check mdi-20px rounded-circle bg-amber text-white d-flex justify-center"
        style="min-height: 30px !important; min-width: 30px !important; line-height: 30px !important"
        @click="params.clicked(params.data)" />
    </div>
  </div>
</template>