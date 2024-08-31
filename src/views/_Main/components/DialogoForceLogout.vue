<script>
export default { name: 'cmp-dialogo-force-logout' }
</script>

<script setup>
import { ref, inject, watch } from "vue"
import { $auth } from "@/plugins";
const show = ref(false)
const { hash } = inject("Menus")

watch(() => show.value, (v) => {
  if (v) {
    $auth.logout(hash.value)
  }
})

const refreshPage = () => window.location.reload();

defineExpose({ show })
</script>

<template lang="pug">
v-dialog(v-model="show" width="330" persistent)
  v-card.pa-3
    v-card-text.px-5
      div.gap-8.flex-column.align-center.text-center
        v-icon(size="40" color="grey-lighten-2") mdi-power-plug-off
        span.text-h4.font-weight-bold(style="line-height: 20px !important") Debe inicar sesion nuevamente
        span.text-h6 Se ha realizado una configuración global.
        span.text-h6 &mdash; Área de Sistemas &mdash; 
        v-btn.mt-2.px-6(rounded prepend-icon="mdi-home-export-outline" variant="tonal" @click="refreshPage()") Ir al inicio

</template>
