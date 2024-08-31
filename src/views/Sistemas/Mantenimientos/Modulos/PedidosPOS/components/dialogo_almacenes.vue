<script>
export default { name: 'dialogo-pedidos-pos-almacenes' }
</script>
<script setup>
import { inject, ref, watch } from "vue"

const props = defineProps({
  lista: { type: Object, default: null },
  agencia: { type: String, default: null }
})

const show = ref(false)
const agencia_selected = ref()
const almacenes = ref([])
const seleccionados = ref([])

watch(() => agencia_selected.value, (v) => {
  let s = props.lista.find(item => item.agencia_codigo == v)
  almacenes.value = s.almacenes
})

watch(() => props.agencia, (v) => {
  agencia_selected.value = v
  let s = props.lista.find(item => item.agencia_codigo == v)
  almacenes.value = s.almacenes
})

function setAlmacenes(almacenes) {
  seleccionados.value = almacenes
}

function guardar() {
  set_almacenes(seleccionados.value)
  show.value = false
}

const { set_almacenes } = inject('prov_set_almacenes')

const mostrar = () => show.value = true

defineExpose({ setAlmacenes, mostrar })
</script>
<template lang="pug">
v-dialog(v-model="show" scrollable eager width="350" persistent no-click-animation)
  v-card
    v-toolbar.pl-1(density="comfortable")
      v-select.ma-2(v-model="agencia_selected" :items="lista" label="Agencias" item-value="agencia_codigo" item-title="agencia" :return-object="false")
      v-btn(icon="mdi-window-close" @click="show = false")
    v-card-text.px-4.py-3

      v-checkbox.mb-1(v-for="item of almacenes" :key="item.id" v-model="seleccionados" :value="item")
        template(#label)
          div.gap-0.align-centers.flex-column
            span.text-black {{ item.almacen }}
            span.mb-1.text-caption.text-blue {{ item.almacen_codigo }} - {{ item.abrev }}
    v-divider.mt-2
    v-card-actions
      v-btn.mx-auto.px-5(variant="tonal" append-icon="mdi-check" @click="guardar()") Aceptar
</template>