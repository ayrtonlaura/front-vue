<script setup>
import loadingSpinner from '@/components/material/LoadingSpinner.vue'
</script>

<template lang="pug">
div.gap-0.flex-column.align-center
  loadingSpinner(style='transform: scale(0.8)')
  span.text-h6.text-primary Espere un momento..
</template>
