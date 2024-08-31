<script>
export default { name: 'cmp-cambiar-vendedor' }
</script>

<script setup>
import { ref, reactive, onMounted, computed } from "vue"
import { $swal } from '@/plugins';
import { vMaska } from "maska";
import { sistemas_soporte_model } from "@/models";
import img_anulado from '@/assets/images/anulado.png'

const m_soporte = new sistemas_soporte_model()

const options = reactive({
  mask: "A##########",
  tokens: {
    A: { pattern: /[FB]/, transform: (chr) => chr.toUpperCase() }
  },
  eager: true
})

const isLoading = ref(false)
const documento_actual = ref({
  opcion: ''
})

const busqueda = reactive({
  base: 'JCHS2024',
  td: ['BV'],
  documento: 'B5000004628',
  nuevo: ''
})

const deshabilitar_boton = computed(() => {
  if (!documento_actual.value.documento) return true
  if (documento_actual.value.documento?.cabecera.estado == "A") return true
  // if (documento_actual.value.documento?.cabecera.es_diferida == "SI") return true
  return false
})

const vendedores = ref([])

async function buscar() {
  documento_actual.value = {}
  isLoading.value = true
  documento_actual.value = await m_soporte.buscar_documento(busqueda)
  isLoading.value = false
}

async function convertir() {
  if (!busqueda.nuevo) return $swal.fire('Sin vendedor seleccionado', '', 'error')
  console.log('guardar');

  let res = await m_soporte.guardar_vendedores({ busqueda, documento: documento_actual.value })
  if (res.ok) {
    $swal.fire('Documento modificado a DIFERIDO', false, 'success')
    documento_actual.value.opcion = ''
    // documento_actual.value.detalle = []
  }

}

onMounted(async () => {
  vendedores.value = await m_soporte.listar_vendedores({ base: busqueda.base })
})
</script>

<template lang="pug">
v-container
  v-row(dense)
    v-col.py-4(cols="12")
      div.gap-10.align-center
        div.w110.px-2
          v-radio(:label="busqueda.base" :model-value="true")
        div.w180
          v-text-field.text-center(
            ref="caja"
            v-model="busqueda.documento" v-maska:[options]
            variant="outlined"
            density="compact"
            @keyup.enter="() => busqueda.documento.length == 11 && buscar()"
            )
            template(#prepend-inner)
              v-menu
                template(#activator="{ props }")
                  v-btn(variant="tonal" v-bind="props" append-icon="mdi-chevron-down") {{ busqueda.td[0] }}
                v-list.py-0(v-model:selected="busqueda.td" mandatory density="compact")
                  v-list-item.text-h6(key="0" value="FT" color="primary") FT
                  v-list-item.text-h6(key="1" value="BV" color="primary") BV

            template(#label)
              span Nro de Documento ({{ busqueda.documento.length }})
        v-btn(append-icon="mdi-magnify" :disabled="busqueda.documento.length < 11" :loading="isLoading" @click="buscar") Buscar
        v-spacer
        div.gap-5.text-h6.mr-5.text-green(v-if="documento_actual.opcion !== ''")
          i.mdi.mdi-alert-circle
          span En documentos 
            span.font-weight-bold {{ documento_actual.tabla?.tabla }}

      div.py-1.p-relative
        //- img.anulado(v-if="documento_actual.cabecera?.documento.estado=='A'" :src="img_anulado")
        v-container(v-if="documento_actual.documento" fluid)
          v-row(dense)
            v-col
              img.anulado(v-if="documento_actual.documento.cabecera.estado=='A'" :src="img_anulado")
              span.text-h6.text-decoration-underline Documento
              div.gap-4.flex-column.text-h6
                span Agencia: {{ documento_actual.documento.cabecera.agencia_codigo }} - {{ documento_actual.documento.cabecera.agencia }}
                span Estado: {{ documento_actual.documento.cabecera.estado }} 
                span Fecha: {{ documento_actual.documento.cabecera.fecha }} 
                span Diferida: {{ documento_actual.documento.cabecera.es_diferida }} 
                v-divider
                span.text-primary Vendedor: {{ documento_actual.documento.cabecera.vendedor_codigo }} - {{ documento_actual.documento.cabecera.vendedor }}
                v-divider
                span Condicion de venta: {{ documento_actual.documento.cabecera.forma_codigo }} - {{ documento_actual.documento.cabecera.forma }} 
                span Vencimiento: {{ documento_actual.documento.cabecera.vencimiento }} 
                v-divider
                span.text-caption * Se debe cambiar en la tabla <u>FT0001ACUD</u>


            v-col.px-4
              span.text-h6.text-decoration-underline Guias
              div.gap-4.flex-column.text-h6
                template(v-for="guia of documento_actual.documento.guias" :key="guia.guia")
                  div.mb-2.gap-5.flex-column
                    span.font-weight-bold {{ guia.guia }} - {{ guia.fecha }}
                    span {{ guia.almacen_codigo }} - {{ guia.almacen }}
                    v-divider
                    span.text-primary Vendedor: {{ guia.vendedor_codigo }} - {{ guia.vendedor }}
                    v-divider
                    span Condicion de venta: {{ guia.forma_codigo }} - {{ guia.forma }} 
                    span Vencimiento: {{ guia.vencimiento }} 
            v-col
              span.text-h6.text-decoration-underline Cartera
              div.gap-4.flex-column.text-h6
                span Importe: {{ documento_actual.documento.cartera.moneda }} {{ documento_actual.documento.cartera.importe }} 
                span Saldo: {{ documento_actual.documento.cartera.moneda }} {{ documento_actual.documento.cartera.saldo }} 
                v-divider
                span.text-primary Vendedor:  {{ documento_actual.documento.cartera.vendedor_codigo }} - {{ documento_actual.documento.cartera.vendedor }}
                v-divider
                span Vencimiento:  {{ documento_actual.documento.cartera.vencimiento }} 


  v-row(dense)
    v-col.pb-4(cols="12")
      div.mx-auto.w450.gap-10.align-center.py-2.px-3.rounded-lg(style="background-color: #dde8fd;")
        v-autocomplete(v-model="busqueda.nuevo" :items="vendedores" label="Vendedores" item-title="nombre" :disabled="deshabilitar_boton")
        v-btn(rounded :color="deshabilitar_boton ? 'grey' : 'amber'" append-icon="mdi-flash" :disabled="deshabilitar_boton" @click="convertir") Cambiar vendedor
</template>

<style scoped>
img.anulado {
  position: absolute;
  z-index: 999;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  margin: auto;
  transform: rotate(-15deg);
}
</style>