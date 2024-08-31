<script>
export default { name: 'cmp-fecha-single' }
</script>
<script setup>
import { computed, ref } from 'vue';
import { $moment } from '@/plugins'

const emit = defineEmits(["update:modelValue"])

const props = defineProps({
  label: {
    type: String,
    default: "Fecha"
  },
  disabled: {
    type: Boolean,
    default: false
  },
  // eslint-disable-next-line vue/require-default-prop, vue/require-prop-types
  modelValue: {}
})

const fecha = computed({
  get: () => props.modelValue,
  set: (value) => emit('update:modelValue', value.substring(0, 10))
})

const presetDates = ref([
  { label: ' Seleccionar HOY ', value: $moment() },
]);

const format = (date) => {
  return $moment(date).format("DD/MMM/YYYY").replace(".", "")
}
</script>
<template lang="pug">
div.gap-0.flex-column(:class="disabled ? 'disabled': ''")
  span.text-h6.pl-1.text-grey-darken-1 {{ label }}
  vue-date-picker.text-grey(
    v-model="fecha"
    utc="preserve"
    :month-change-on-scroll="false" 
    no-today
    locale="es" 
    position="right"
    auto-apply 
    :clearable="false" 
    :enable-time-picker="false" 
    :preset-dates="presetDates" 
    :format="format"
    :disabled="disabled"
    )
</template>
<style>
.disabled {
  span {
    color: #C5CAD2 !important;
  }

  .dp__input {
    pointer-events: none !important;
    color: #E2E7F0 !important;
    border-bottom-color: #E2E7F0 !important;
    border-bottom-style: dashed !important;
  }

  .dp__icon {
    cursor: default !important;
    color: #E2E7F0 !important;
  }
}
</style>