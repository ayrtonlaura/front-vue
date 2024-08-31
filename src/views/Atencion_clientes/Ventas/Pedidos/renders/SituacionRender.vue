<script setup>
defineProps({
  params: {
    type: Object,
    default: null
  }
})

const estadoMap = {
  A: 'APROBADO',
  P: 'PENDIENTE',
  F: 'FACTURADO',
  X: 'RECHAZADO',
}
</script>
<template lang="pug">
div.gap-4.w-100.flex-column.text-h6
  span.font-weight-bold(:class="params.data.F5_CESTADO == 'X' ? 'text-red' : ''") {{ estadoMap[params.data.F5_CESTADO] || '' }}
  span.text-truncate.text-caption(v-if="params.data.F5_CESTADO == 'A'") por {{ params.data.usuario_aprueba }}
  div(v-if="params.data.F5_CESTADO == 'F'")
    span.pr-1 {{ params.data.F5_CTD }}
    span {{ params.data.F5_CNUMSER }} 
    span {{ params.data.F5_CNUMDOC }} 

</template>
