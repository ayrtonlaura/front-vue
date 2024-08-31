<script>
export default { name: 'cmp-cofing-entorno' }
</script>
<script setup>
defineProps({
  entorno: {
    type: Object,
    default: () => { }
  }
})
</script>
<template lang="pug">
div
  // eslint-disable-next-line vue/no-mutating-props
  v-dialog(v-model="entorno.error" scrim="white" persistent contained no-click-animation style="backdrop-filter: blur(2px);" width="300")
    v-card.rounded-lg
      v-card-text.py-4.px-3

        div.gap-5.flex-column.text-h6.align-center
          v-icon.mb-1(icon="mdi-alert-circle" size="30")
          span.text-h5.font-weight-bold.mb-2 Entorno del módulo
          span No puede utilizar el módulo actual. 
          span Revise los siguientes datos: 

        div.gap-6.flex-column.text-h6.salign-center.mt-2.pl-5
          div.gap-4.align-center.text-red(v-for="err of entorno.errores" :key="err") 
            i.mdi.mdi-circle-small.mdi-20px
            span {{ err }}
        v-divider.my-4
        div.text-h6 Una vez revisado, ingrese nuevamente al módulo.

  v-slide-x-transition
    div.bloqueo(v-if="entorno.loading")
      div.snack_loading.gap-10.align-center
        v-progress-circular(size="14" width="1" indeterminate color="#71767f")
        span.text-h6 Cargando entorno... 

</template>
<style scoped>
.bloqueo {
  height: 100%;
  width: 100%;
  background-color: rgb(255 255 255 / .5);
  position: absolute;
  z-index: 10;
}

.snack_loading {
  z-index: 11;
  position: absolute;
  bottom: 10px;
  left: 10px;
  padding: 8px 10px;
  background-color: --blue;
  border-radius: 5px;
  border-style: dashed;
  border-width: 1px;
  border-left-style: solid;
  border-left-width: 3px;
  border-color: #b6becc;
  color: #71767f;
  background-color: white;
  box-shadow: 0 0 10px 0 rgb(0 0 0 /.2);
}
</style>