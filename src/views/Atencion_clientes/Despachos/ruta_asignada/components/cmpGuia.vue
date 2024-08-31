<script setup>
import { ref, computed } from 'vue'

const emit = defineEmits(['setVista', 'estadoGuia'])
const numeroIndexHijo = ref()
const btnToSelect = ref('')
const selectedBtns = ref('')
const textareaContent = ref('')
const dialogGuardarEntrega = ref(false)

const guia = ref({
  numero: '',
  indice: null,
  index: null
})

const botones = [
  { v: 'left', t: 'Entregado' },
  { v: 'center', t: 'Entrega Parcial' },
  { v: 'right', t: 'Rechazado' }
]

function setDatos(data) {
  guia.value = Object.assign({}, data.guia)
  console.log(data);
}

function abrirGuardar() {
  dialogGuardarEntrega.value = true
  // emit('estadoGuia', { estado: selectedBtns.value, indice: guia.value.indice, item: guia.value.index })
}

function confirmarEntrega() {
  dialogGuardarEntrega.value = false
  emit('estadoGuia', { estado: selectedBtns.value, indice: guia.value.indice, item: guia.value.index })
  regresar()
}

function confirmSelection(btn) {
  btnToSelect.value = selectedBtns.value
  selectedBtns.value = btn
}

const letras = 10
const validado = computed(() => {
  if (selectedBtns.value == 'left') return true
  if (textareaContent.value.length < letras) return false
  return true
})

function ver_detalle() {
  emit('setVista', { vista: 3 })
}

function regresar() {
  emit('setVista', { vista: 1 })
}

defineExpose({ setDatos })
</script>

<template lang=pug>
div.pa-2.gap-7.flex-column

  v-dialog(v-model="dialogGuardarEntrega" width="340")
    v-card
      v-card-text DIALOGO PARA CONFIRMAR ENTREGA 
      v-card-actions.gap-20.justify-center
        v-btn(variant="flat" @click="confirmarEntrega()") Aceptar 
        v-btn( variant="flat" @click="dialogGuardarEntrega = false") Cancelar

  div.gap-10.justify-space-between.align-center
    div.gap-2.flex-column
      span.text-h3.font-weight-bold {{ guia.guia?.numero || '0000000000' }}
      span.text-h6 28/12/2023

    span.text-h6.font-weight-bold.border.pa-2.rounded-lg 12 Productos

    div.gap-0.justify-space-between.align-center
      span.text-h6.font-weight-bold Orden: 0001
      span.text-h4.font-weight-bold {{ numeroIndexHijo }}

  div.gap-4.justify-space-between.flex-column
    span.text-h5 TRANSPORTES UNIDOS DE COMERCIO SRLTA
    span.text-h5 AV. PERU 1654 SANTA ANITA

  div.gap-0.justify-space-between.align-center
    v-btn(color="blue" variant="tonal" append-icon="mdi-map-marker mdi-20px" rounded) Ubicacion
    v-btn(variant="tonal" @click="ver_detalle()" rounded append-icon="mdi-format-list-bulleted") Detalles

  v-divider.mt-2

  div.gap-7.justify-space-between.align-center.pa-2

    template(v-for="item of botones")
      v-btn.custom-btn(
        :ripple="false"
        :variant="selectedBtns === item.v ? 'flat' : 'tonal'"
        :color="selectedBtns === item.v ? 'purple' : 'grey'"
        @click="confirmSelection(item.v)" 
        ) {{ item.t }}

  div.pa-2.pb-1.bg-boton.border.rounded(style="border-color: #d1e2fe !important;")
    v-textarea(
      no-resize
      rows="3"
      label="Observaciones" 
      v-model="textareaContent"
      :error-messages="!validado ? `Debe escribir al menos ${letras} letras` : ''"
      :persistent-hint="!validado"
    )

  div.gap-0.justify-space-around.pt-4
    v-btn(@click="regresar()" prepend-icon="mdi-undo" variant="tonal") Cancelar
    v-btn(@click="abrirGuardar()" append-icon="mdi-content-save" :disabled="!validado || selectedBtns ==''") Guardar
</template>