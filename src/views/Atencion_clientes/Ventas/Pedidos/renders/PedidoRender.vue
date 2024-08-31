<script setup>
// import { $moment } from '@/plugins'
defineProps({
  params: {
    type: Object,
    default: null
  }
})
</script>
<template lang="pug">
div.gap-5.w-100.flex-column
  span.text-h6.gap-5.align-center
    span.text-caption Pedido:
    span.font-weight-bold(style="font-size: 13px") {{ params.data.F5_CNUMPED }} 

    v-spacer
    span.text-caption.text-grey-darken-1(style="font-size: 11px !important") {{ params.data.F5_CGLOSA }} 


    //- span.text-orange-darken-2.pl-2 {{ $moment(params.data.F5_DFECDOC).format("DD/MMM/YYYY").replace(".", "") }}
  span.text-h6.text-truncate
    span.text-primary.font-weight-bold {{ params.data.F5_CCODCLI }} - 
    span {{ params.data.F5_CNOMBRE }}
</template>
