<script setup>
import { computed } from 'vue';
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: { type: String, default: null },
  lineas: { type: Array, default: null }
})

const show = ref(false)
const temporal = ref()
const gridLineas = ref(null)

const emit = defineEmits(['update:modelValue'])

const selected = computed(() => {
  return props.modelValue.split(",")
})

const readyGridLineas = params => {
  gridLineas.value = params.api

  // gridLineas.value.forEachNode(node => {
  //   if (!node.group)
  //     if (props.modelValue.includes(selected.value)) node.setSelected(true);
  // })
}



watch(() => show.value, () => {
  // console.log(v);
  gridLineas.value.forEachNode(node => {
    if (!node.group)
      if (selected.value.includes(node.data.codigo)) node.setSelected(true);
  })
}, {
  inmediate: true
})


const autoGroupColumnDefLineas = ref({
  headerName: 'Lineas de productos',
  field: 'linea',
  sortable: false,
  flex: 1,
  cellRenderer: 'agGroupCellRenderer',
  cellRendererParams: { checkbox: true }
})

const columnas_lineas = [{ field: 'grupo', rowGroup: true, hide: true }]

const SelLength_lineas = computed(() => {
  // console.log(props.modelValue);
  if (props.modelValue == '') return 0
  return props.modelValue.split(',').length
})

// aqui se actualiza el v-model
const onSelectedLineas = () => {
  // log
  // SelLength_lineas.value = gridLineas.value.getSelectedRows().length
  // SelLength_lineas.value = props.modelValue.getSelectedRows().length
  temporal.value = gridLineas.value.getSelectedRows().map(item => item.codigo)
}

const checkAlmacenes = ref(true)
watch(() => checkAlmacenes.value, (v) => {
  const selected = []
  gridLineas.value.forEachNode(node => selected.push(node))
  gridLineas.value.setNodesSelected({ nodes: selected, newValue: v })
})

function mostrar() {
  show.value = true
}

function aceptar() {
  emit('update:modelValue', temporal.value.join(','))
  show.value = false
}

function cerrar() {
  show.value = false
}

function llenar(data) {
  // lineas.value = data;
  gridLineas.value.setGridOption('rowData', data)
}

function marcarGrupo(m) {
  const selected = []
  gridLineas.value.forEachNode(node => {
    if (node.data && node.data.linea_grupo == m) selected.push(node)
  })
  gridLineas.value.setNodesSelected({ nodes: selected, newValue: true })
}

defineExpose({ marcarGrupo, llenar })
</script>

<template lang="pug">
div
  v-text-field(label="Lineas de productos" append-inner-icon="mdi-magnify" variant="filled" readonly :value="`${SelLength_lineas} seleccionados`" @click="mostrar()")

  //- pre.text-caption {{ modelValue }}

  v-dialog(v-model="show" width="400" persistent eager no-click-animation)
    v-card
      v-toolbar(flat height="44")
        span.text-h6.pl-3.font-weight-bold Líneas de productos
        v-spacer
        div.w80
          v-checkbox(
            v-model="checkAlmacenes" 
            label="Todos" 
            false-icon="mdi-checkbox-blank-outline mdi-17px" 
            true-icon="mdi-checkbox-marked mdi-17px"
          )
        v-divider.mr-3(vertical inset)
        v-btn(icon="mdi-window-close mdi-20px" variant="tonal" size="34" @click="cerrar()")

      v-card-text.pa-2
        //- div
        //- pre.text-caption temporal: {{ temporal }}
        //- pre.text-caption modelValue: {{ modelValue }}
        //- pre.text-caption selected: {{ selected }}

        //- pre.text-caption lineas: {{ lineas }}
        //- div.text-grey-darken-2.gap-10.justify-space-between(style="padding: 6px 0px; font-size: 13px; line-height: 14px;")
          span.pl-2 Líneas de productos
          span.text-caption.pr-1.text-grey-darken-2 ({{ SelLength_lineas }})

        agGrid.noHeader(
          :auto-group-column-def="autoGroupColumnDefLineas"
          :column-defs="columnas_lineas"
          :data="lineas"
          :group-default-expanded="1"
          :group-selects-children="true"
          :suppress-row-click-selection="true"
          :suppress-group-rows-sticky="true"
          row-selection="multiple"
          style="width: 100%; height: calc(100vh - 290px)"
          @grid-ready="readyGridLineas"
          @row-selected="onSelectedLineas")
      v-divider
      v-card-actions.gap-0
        v-btn.mx-auto.px-4(variant="tonal" append-icon="mdi-check" @click="aceptar()") Aceptar

</template>