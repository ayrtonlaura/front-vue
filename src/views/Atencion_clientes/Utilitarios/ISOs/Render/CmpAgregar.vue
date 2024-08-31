<script setup>
import { ref, watch, computed } from 'vue'

const props = defineProps({
  data: { type: Object, default: {} }
})

const lista_marcas = ref([
  { id: 'OTA', descripcion: 'OTANI' },
  { id: 'DUN', descripcion: 'DUNLOP' },
  { id: 'WES', descripcion: 'WESTLAKE' },
  { id: 'KAP', descripcion: 'KAPSEN' },
  { id: 'GOD', descripcion: 'GOODTYRE' },
  { id: 'BIR', descripcion: 'BIRLA' },
  { id: 'BOT', descripcion: 'BOTO' }
])
const lista_tipos = ref([
  { id: 'iso', descripcion: 'ISO' },
  { id: 'catalogo', descripcion: 'Catalogo' },
  { id: 'ficha', descripcion: 'Ficha Tecnica' },
  { id: 'camiones', descripcion: 'Camiones' },
  { id: 'seguimiento', descripcion: 'Seguimiento' }
])

const mostrar_informacion = ref(false)
const formItem = ref({
  tipo: null,
  descripcion: '',
  marca: '',
  addArchivo: null
})

const modalTitle = computed(() => (props.data ? 'Editar' : 'Crear'))

function show() {
  mostrar_informacion.value = true
}
watch(
  () => props.data,
  v => {
    formItem.value = Object.assign({}, v)
  }
)
defineExpose({ show })
</script>

<template lang="pug">
v-dialog(v-model="mostrar_informacion" width="450" scrollable persistent no-click-animation eager)
  v-card 
    v-card-title  {{ modalTitle }} archivo
    v-card-text
      Form(ref="formBorrador" v-slot="{ errors, meta }")
        v-container(fluid)
          v-row(dense)
            v-col(cols="12")
              v-select(v-model="formItem.tipo" label="Tipo" :items="lista_tipos" placeholder="Tipo de Archivo" :return-object="false")
            v-col(cols="12") 
              v-file-input(v-model="formItem.addArchivo" multiple label="Seleccione un documento")
            v-col(cols="12")
              v-autocomplete(v-model="formItem.marca_id" label="Marca" :items="lista_marcas" placeholder="Seleccione una Marca" :return-object="false")
            v-col(cols="12") 
              v-textarea(v-model="formItem.descripcion" label="Descripcion" placeholder="Sin descripcion..." auto-grow shaped)
            v-col(cols="12") 
              Field(name="Nro. ISO")
                v-text-field(
                  v-model="formItem.archivo"                        
                  aria-autocomplete="none"
                  label="Nro. ISO"
                  placeholder="ISO NRO"
                )
    v-card-actions
      v-row
        v-col.gap-0.justify-space-around
          v-btn.mr-5(variant="flat") Guardar
          v-btn(size="small" variant="flat" @click="mostrar_informacion.value = false") Salir 
</template>
