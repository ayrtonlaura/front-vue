<script setup>
import { computed, ref } from 'vue'
import { $moment } from '@/plugins';
import highlight from '@/composables/highlight'

const props = defineProps({
  params: {
    type: Object,
    default: null
  }
})
const show = ref(false)

const formato_highlight = (texto) => texto ? highlight(texto, props.params.filtro) : 'Sin dato'

function seleccionar() {
  let node = props.params.node
  if (props.params.seleccionar) node.setSelected(!node.isSelected())
}

function fn_detalles() {
  props.params.ver_detalles()
}

function fn_ver_ubicacion() {
  props.params.ver_ubicacion()
}

function fn_añadir() {
  props.params.añadir()
}

const mostrar_boton_ubicacion = computed(() => {
  let ubicacion = props.params.data.ubicacion.trim()

  if (ubicacion == '') return false
  if (ubicacion == ',') return false
  if (!ubicacion.includes(",")) return false

  let ubi = ubicacion.split(",")
  let lat = ubi[0], lng = ubi[1]

  const regLat = new RegExp(/^-?([1-8]?[1-9]|[1-9]0)\.{1}\d{1,15}/g)
  const regLng = new RegExp(/^-?(([-+]?)([\d]{1,3})((\.)(\d+))?)/g)
  if (!regLat.exec(lat)) return false
  if (!regLng.exec(lng)) return false
  return true
})
</script>
<template lang="pug">
div.gap-0.align-center.fill-height

  v-dialog(v-model="show" width="350")
    v-card
      v-card-text
        pre.text-caption {{ params.data }}

  div.px-3.gap-3.flex-column.fill-height.justify-center(@click="seleccionar()" @dblclick="fn_añadir()")
    span.text-h5.text-primary(v-html="formato_highlight(params.data.guia)")
    span.text-h6 {{ $moment(params.data.fecha).format("DD/MMM/YYYY").replace(".", "") }}
  div.text-truncate.gap-4.flex-column.fill-height.justify-center(style="width: 100%;" @click="seleccionar()" @dblclick="fn_añadir()") 
    div.gap-10.text-h6(style="width: 100%")
      div.text-truncate(style="width: 50%" v-html="formato_highlight(params.data.cliente)")
      div.text-truncate(style="width: 50%" v-html="formato_highlight(params.data.movimiento)")
    div.text-truncate.text-h6(v-html="formato_highlight(params.data.direccion)")
  div.px-2.gap-8.align-center
    template(v-if="mostrar_boton_ubicacion")
      v-btn.mx-auto(variant="tonal" size="30" color="teal" icon="mdi-map-marker-outline" @click="fn_ver_ubicacion()")
    v-btn.mx-auto(variant="tonal" size="30" icon="mdi-alert-circle-outline" @click="fn_detalles()")
    template(v-if="params.quitar")
      v-btn.mx-auto(variant="tonal" color="red-lighten-2" append-icon="mdi-trash-can" @click="params.quitar()") Quitar
</template>