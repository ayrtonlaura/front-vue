<script setup>
import { $numeral } from '@/plugins'
defineProps({
  params: {
    type: Object,
    default: null
  }
})
</script>
<template lang="pug">
div.gap-4.w-100.flex-column.text-right
  span.text-h6
    span.text-caption.pr-2 {{ params.data.F5_CCODMON == 'US' ? 'USD' : 'S/' }}
    span.font-weight-bold {{ $numeral(params.value).format('0,0.00') }}
</template>
