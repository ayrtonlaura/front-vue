<script>
export default { name: 'cmp-ordenes' }
</script>
<script setup>
import { inject, onMounted, ref } from "vue"
import { $moment, $numeral } from "@/plugins"


const filtro = ref('')

const {
  ordenes, ordenes_registradas, modificar_orden, orden_actual,
  crear_orden,
  entorno,
  loadings
} = inject('despachos')


onMounted(() => {
  // ordenes_registradas()
})
</script>
<template lang="pug">
v-container.pa-2
  v-row(dense align="center")
    v-col.pa-1.gap-7.align-center
      div.gap-4.flex-column
        span.text-h5.font-weight-bold Órdenes de despacho registradas
        span.text-caption Listado de todas las órdenes de despacho hasta hoy
      v-btn.ml-2(rounded prepend-icon="mdi-magnify" color="primary" :loading="loadings.listando" :disabled="loadings.en_creacion" @click="ordenes_registradas()") Listar
      v-spacer
      v-btn(variant="tonal" rounded append-icon="mdi-plus" color="primary" :disabled="loadings.en_creacion" @click="crear_orden()") Crear

  v-row(dense)
    v-col.pt-3

      div(v-if="!entorno.buscado")
        v-box(tipo="inicial" boton="listar")

      template(v-if="entorno.buscado")
        v-box(v-if="loadings.listando" tipo="loading")
        div(v-if="!loadings.listando && ordenes.length == 0")
          v-box(tipo="no-data")

        v-virtual-scroll(v-if="ordenes.length > 0" :items="ordenes" height="calc(100vh - 200px)")
          template(#default="{ item }")

            div.gap-10.align-center.px-2.border.mb-1.rounded(
              style="padding: 5px 0; transition: all ease .2s" 
              :class="{ 'bg-blue-lighten-4': item.id == orden_actual.id, 'text-grey-lighten-1': loadings.en_creacion }" 
              )
              div.gap-4.justify-space-between.flex-column.flex-fill
                span.text-h5.font-weight-bold {{ item.agencia_id }}-{{ $numeral(item.numeracion).format('000000') }}
                span.text-h6 {{ $moment(item.creado_en).format("DD/MMM/YYYY, HH:mm") }}

              div.gap-4.justify-space-between.flex-column.w100
                span.text-caption Chofer
                span.text-h6.font-weight-bold.text-truncate 
                  i.mdi.mdi-clipboard-account.pr-1
                  span {{ item.chofer.nombre }}

              div.gap-4.justify-space-between.flex-column.pr-2
                span.text-h6 {{ item.guias_cantidad }} guías
                span.text-h6.font-weight-bold {{ item.estado }}

              v-btn(
                variant="tonal" rounded append-icon="mdi-pencil" color="blue" 
                :disabled="loadings.en_creacion" 
                :loading="loadings.buscando_orden && item.id == orden_actual.id"
                @click="modificar_orden(item)"
              ) Modificar

        div.w200.mt-3(v-if="ordenes.length > 0")
          v-filtro-input(v-model="filtro" placeholder="Filtrar en órdenes")

</template>