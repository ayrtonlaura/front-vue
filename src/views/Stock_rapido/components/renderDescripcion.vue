<script setup>
import highlight from '@/composables/highlight'
const props = defineProps({ params: {} })
const formato = () => {
  let str = props.params.value.replace("NTCO: ", "")
  return highlight(str, props.params.filtro)
}
</script>

<template lang="pug">
div.gap-8.align-center
  v-btn(size="20" icon="mdi-plus mdi-16px" @click='params.clicked(params.data)' 
  color="amber-lighten-4" style="margin-bottom:2px")
  span.text-truncate(v-html='formato()')
</template>
