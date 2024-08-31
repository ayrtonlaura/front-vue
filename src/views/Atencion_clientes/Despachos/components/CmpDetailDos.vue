<script setup>
const props = defineProps(['item'])
</script>
<template lang="pug">
div(v-for="guia in item.guiasNro")
  v-card.pa-4
    div.gap-5.justify-space-between.align-center
      div.gap-20.justify-space-between.align-center
        span.text-h4.font-weight-bold {{ guia.numero }}
      div.gap-20.justify-space-between.align-center
        span.text-h4 {{item.fecha}}
    div
      div
        span.text-h4 NEUMATICOS ROJAS EIRL
    div
      div.gap-10.justify-space-between.align-center
        span.text-h4 {{ guia.productoTotal }} PRODUCTOS
        v-btn(color="blue" @click="verMapa()" ) En ruta
  
  //- v-card.pa-4.mt-4
  //-   div.gap-5.justify-space-between.align-center
  //-     div.gap-20.justify-space-between.align-center
  //-       span.text-h4.font-weight-bold 5040012313
  //-     div.gap-20.justify-space-between.align-center
  //-       span.text-h4 27/12/2023
  //-   div
  //-     div
  //-       span.text-h4 NEUMATICOS ROJAS EIRL
  //-   div
  //-     div.gap-10.justify-space-between.align-center
  //-       span.text-h4 5 PRODUCTOS
  //-       v-btn(color="blue" @click="verMapa()") En ruta
  //- v-divider(class="mx-2")
  //- v-card.pa-4.mt-4
  //-   div.gap-5.justify-space-between.align-center
  //-     div.gap-20.justify-space-between.align-center
  //-       span.text-h4.font-weight-bold 5040012313
  //-     div.gap-20.justify-space-between.align-center
  //-       span.text-h4 27/12/2023
  //-   div
  //-     div
  //-       span.text-h4 NEUMATICOS ROJAS EIRL
  //-   div
  //-     div.gap-10.justify-space-between.align-center
  //-       span.text-h4 5 PRODUCTOS
  //-       v-btn(color="blue" @click="verMapa()") En ruta
  //- v-divider(class="mx-2")
  //- v-card.pa-4.mt-4
  //-   div.gap-5.justify-space-between.align-center
  //-     div.gap-20.justify-space-between.align-center
  //-       span.text-h4.font-weight-bold 5040012313
  //-     div.gap-20.justify-space-between.align-center
  //-       span.text-h4 27/12/2023
  //-   div
  //-     div
  //-       span.text-h4 NEUMATICOS ROJAS EIRL
  //-   div
  //-     div.gap-10.justify-space-between.align-center
  //-       span.text-h4 5 PRODUCTOS
  //-       v-btn(color="blue" @click="verMapa()") En ruta
  v-divider(class="mx-2")
</template>
