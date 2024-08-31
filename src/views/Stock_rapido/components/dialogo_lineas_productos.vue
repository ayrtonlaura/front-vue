<script setup>
import { ref, watch } from 'vue'

const props = defineProps({
  modelValue: {},
  // lineas: {}
})


const lineas = ref([])

// watch(() => props.modelValue, (v) => {
//   // console.log(v);

//   // gridLineas.value = params.api

//   // gridLineas.value.forEachNode(node => {
//   //   if (!node.group)
//   //     if (props.modelValue.includes(node.data.id)) node.setSelected(true);
//   // })


// })

const emit = defineEmits(['update:modelValue'])

const show = ref(false)

const autoGroupColumnDefLineas = ref({
  headerName: 'Lineas de productos',
  field: 'descripcion',
  sortable: false,
  flex: 1,
  cellRenderer: 'agGroupCellRenderer',
  cellRendererParams: { checkbox: true }
})

const columnas_lineas = [{ field: 'linea_grupo', rowGroup: true, hide: true }]

const gridLineas = ref(null)

const readyGridLineas = params => {
  gridLineas.value = params.api

  // gridLineas.value.forEachNode(node => {
  //   if (!node.group)
  //     if (props.modelValue.includes(node.data.id)) node.setSelected(true);
  // })
}

const SelLength_lineas = ref(0)

const onSelectedLineas = () => {
  SelLength_lineas.value = gridLineas.value.getSelectedRows().length
  emit('update:modelValue', gridLineas.value.getSelectedRows().map(item => item.id))
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
  v-text-field(label="Lineas de productos" append-inner-icon="mdi-magnify" variant="filled" readonly
  @click="mostrar()" :value="`${SelLength_lineas} seleccionados`")

  //- pre.text-caption {{ modelValue }}

  v-dialog(v-model="show" width="400" persistent eager no-click-animation)
    v-card
      v-toolbar(flat height="44")
        span.text-h6.pl-3.font-weight-bold Líneas de productos
        v-spacer
        div.w80
          v-checkbox(
            label="Todos" 
            v-model="checkAlmacenes" 
            false-icon="mdi-checkbox-blank-outline mdi-17px" 
            true-icon="mdi-checkbox-marked mdi-17px"
          )
        v-divider.mr-3(vertical inset)
        v-btn(icon="mdi-window-close mdi-20px" @click="cerrar()" variant="tonal" size="34")

      v-card-text.pa-2
        //- div.text-grey-darken-2.gap-10.justify-space-between(style="padding: 6px 0px; font-size: 13px; line-height: 14px;")
          span.pl-2 Líneas de productos
          span.text-caption.pr-1.text-grey-darken-2 ({{ SelLength_lineas }})

        agGrid.noHeader(
          :autoGroupColumnDef='autoGroupColumnDefLineas'
          :columnDefs='columnas_lineas'
          :data='lineas'
          :groupDefaultExpanded="1"
          :groupSelectsChildren='true'
          :suppressRowClickSelection='true'
          :suppressGroupRowsSticky="true"
          @grid-ready='readyGridLineas'
          @row-selected="onSelectedLineas"
          rowSelection='multiple'
          style='width: 100%; height: calc(100vh - 290px)')
      v-divider
      v-card-actions.gap-0
        v-btn.mx-auto.px-4(@click="cerrar()" variant="tonal" append-icon="mdi-check") Aceptar

</template>