<script setup>
import { ref } from 'vue';
import { $moment } from '@/plugins'
import { onMounted } from 'vue';

const emit = defineEmits(["update:modelValue"])

const props = defineProps({
  titulo: {
    type: String,
    default: "Fecha"
  },
  modelValue: {}
})

const fecha = ref()

const presetDates = ref([
  { label: 'Hoy', value: [$moment(), $moment()] },
  { label: 'Esta semana', value: [$moment().startOf('isoWeek'), $moment().endOf('isoWeek')] },
  { label: 'Este mes', value: [$moment().startOf('month'), $moment().endOf('month')] },
]);

const format = (date) => {
  let f1 = $moment(date[0]).format("DD/MMM/YYYY").replace(".", "")
  let f2 = $moment(date[1]).format("DD/MMM/YYYY").replace(".", "")
  return `${f1} — ${f2}`
}

// watch(() => fecha.value, (v) => emit("update:modelValue", v))

const setDate = (value) => {

  let [inicio, final] = value

  if (typeof value[0] == 'string') {
    inicio = inicio.substring(0, 10)
    final = final.substring(0, 10)
  }

  let res = [$moment(inicio).format("YYYY-MM-DD"), $moment(final).format("YYYY-MM-DD")]

  fecha.value = res;
  emit("update:modelValue", res)
}

onMounted(() => {
  fecha.value = props.modelValue
  setDate(props.modelValue)
})
</script>
<template lang="pug">
div.gap-0.flex-column
  span.text-h6.pl-1.text-grey-darken-1 {{ titulo }}
  vue-date-picker(
    :model-value="fecha"
    @update:model-value="setDate" 
    :month-change-on-scroll="false"
    range 
    no-today 
    locale="es" 
    auto-apply 
    :clearable="false" 
    :enable-time-picker="false" 
    :preset-dates="presetDates" 
    utc="preserve"
    position="right"
    :format="format" 
    )
    //- template(v-slot:preset-date-range-button="{ label, value, presetDate }")
      span(:tabindex="0" @click="presetDate(value)") {{ label }}

</template>