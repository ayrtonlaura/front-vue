<script>
export default { name: 'cmp-dialogo-pedido' }
</script>
<script setup>
import { reactive, ref, inject, computed } from "vue"
import { $toast, $yup, $numeral, $moment } from "@/plugins"
import { carrito_ventas_model } from '@/models'
import renderDato from '../renders/renderDato'
// import dialogo_pedido_pdf from './dialogo_pedido_pdf'

const { sesion } = inject('Menus')

const show = ref(false)
const m_carrito = new carrito_ventas_model()
const cmp_dialogo_pedido_pdf = ref()


const { carrito } = inject('prov_carrito_editar')
const columnas = reactive({})
const limpiarCarrito = () => { }

const correos = computed(() => {
  if (carrito.cliente.emails) return carrito.cliente?.emails.join('; ')
  return ""
})

const fecha = computed(() => {
  return $moment(carrito.fecha).format("DD/MMM/YYYY")
})

const cmp_moneda = computed(() => {
  if (!carrito.moneda) return ''
  return carrito.moneda == 'US' ? 'USD - Dolares' : "S/ - Soles"
})

const tipo_atencion = reactive([
  { codigo: 1, descripcion: 'Atención en punto de venta' },
  { codigo: 2, descripcion: 'Diferida en la misma agencia' },
  { codigo: 3, descripcion: 'Diferida en otra agencia', props: { disabled: true } },
  { codigo: 4, descripcion: 'Diferida en varias agencias', props: { disabled: true } },
  { codigo: 5, descripcion: 'Importación (pre-venta)', props: { disabled: true } },
])

const tipos_entrega = reactive(
  [
    { codigo: 'D', descripcion: 'Despacho' },
    { codigo: 'R', descripcion: 'Recojo' },
    { codigo: 'A', descripcion: 'Envío por agencia' },
    { codigo: 'P', descripcion: 'Pendiente' },
  ]
)

// watch(() => carrito.tipo_atencion, () => {
//   if (carrito.productos.length == 0) return

//   if (!carrito.tipo_atencion) return

//   carrito.productos.forEach(el => {
//     if (carrito.tipo_atencion.codigo == 1) el.almacen = almacenes.value[0].codigo
//     if (carrito.tipo_atencion.codigo == 2) el.almacen = [almacenes.value[0].codigo]
//   });

// })

function onChange(val) {
  if (!carrito.tipo_atencion) return
  if (carrito.tipo_atencion.codigo == 1) {
    carrito.productos.forEach(el => el.almacen = val)
  }
}

function fn_igv(importe) {
  return importe - fn_vventa(importe)
}

function fn_vventa(importe) {
  return importe / 1.18
}

const cmp_precio_moneda = computed(() => {
  return carrito.moneda == 'US' ? 'precio_us' : 'precio_mn'
})

const defaults = {

  VTextField: {
    density: 'compact',
    variant: 'filled',
    prependInnerIcon: 'mdi-pencil mdi-14px'
  },
  VSelect: {
    density: 'compact',
    variant: 'filled',
    prependInnerIcon: 'mdi-pencil mdi-14px'
  },
  VAutocomplete: {
    density: 'compact',
    variant: 'filled',
    prependInnerIcon: 'mdi-pencil mdi-14px'
  }
}

const almacenes = computed(() => {

  if (!columnas) return []

  let almas = []
  columnas.forEach(el => {
    if (el.headerName == "Stocks") {
      el.children.forEach(row => {

        let codigo = row.field.substring(1, 5)

        if (codigo.substring(2, 4) !== "31" && codigo.substring(0, 2) === "90") {
          almas.push({
            codigo,
            descripcion: row.headerName
          })
        }
      })
    }
  })

  // eslint-disable-next-line vue/no-side-effects-in-computed-properties
  carrito.almacen_prime = almas[0].codigo

  return almas
})

const form_datos = ref()
const isLoading = ref(false)

async function guardar_pedido() {

  const result = await form_datos.value.validate()

  let productos_sin_almacen = carrito.productos.filter(item => !item.almacen)

  $toast.clear() // hide

  if (result.valid) {

    if (productos_sin_almacen.length > 0) {
      return $toast.error(`Hay ${productos_sin_almacen.length} productos sin almacén seleccionado`, {
        position: 'bottom-center',
        timeout: 3000
      })
    }

    isLoading.value = true
    console.log('guardar_pedido()');

    let res = await m_carrito.guardar_pedido(carrito)

    console.log(res);

    cmp_dialogo_pedido_pdf.value.cargar_pdf({
      empresa: sesion.value.conexion.id,
      pedido: String(res.pedido_numero),
    })

    limpiarCarrito()
    form_datos.value.resetForm({
      values: {
        tipo_atencion: null,
        tipo_entrega: null,
        lugar_entrega: null,
      }
    })
    show.value = false

    isLoading.value = false
  }

}

const schema = $yup.object().shape({
  tipo_atencion: $yup.object().required(),
  tipo_entrega: $yup.object().required(),
  lugar_entrega: $yup.object().required()
})

defineExpose({ show })
</script>
<template lang="pug">
v-dialog.ma-4(v-model="show" fullscreen persistent no-click-animation eager)
  v-defaults-provider(:defaults="defaults")
    v-card.rounded-lg
      v-card-text.pa-1

        //- dialogo_pedido_pdf(ref="cmp_dialogo_pedido_pdf")

        v-dialog(v-model="isLoading" width="200" height="200" eager persistent no-click-animation)
          v-card.rounded-xl
            v-card-text.px-5.py-4
              div.gap-6.flex-column.text-center.align-center
                v-progress-circular.mb-2(:size="42" :width="2" color="primary" indeterminate)
                span.text-h5 Espere un momento
                span.text-h6 Guardando pedido... 

        v-container.pa-1(fluid)
          v-row(dense)
            v-col(cols="3")

              v-container.pa-1
                v-row(dense)
                  v-col

                    div.text-h5.font-weight-bold.mb-2 Datos del pedido

                    table.w-100
                      renderDato(titulo="Moneda" :dato="cmp_moneda")
                      renderDato(titulo="Tipo de precio" :dato="`${carrito.precio} - ${carrito.precio_nombre}`")
                      renderDato(titulo="Forma de pago" :dato="`${carrito.forma} - ${carrito.forma_nombre}`")
                      renderDato(titulo="Vendedor" :dato="carrito.cliente.vendedor")
                      renderDato(titulo="Fecha" :dato="fecha")

                      tr
                        td.label Orden de Compra
                        td.dato
                          v-text-field(v-model="carrito.orden_compra" v-uppercase maxlength="20")
                      tr
                        td.label Placa
                        td.dato
                          v-text-field(v-model="carrito.placa" v-uppercase maxlength="20")

                v-row(dense)
                  v-col.pt-5

                    div.text-h5.font-weight-bold.mb-2 Datos del cliente

                    table.w-100
                      renderDato(titulo="DNI / RUC" :dato="carrito.cliente.codigo")
                      renderDato(titulo="Nombre / Razón Social" :dato="carrito.cliente.nombre")
                      renderDato(titulo="Dirección fiscal" :dato="carrito.cliente.direccion_fiscal")
                      renderDato(titulo="E-mail" :dato="correos")
                      renderDato(titulo="Tipo Cliente" :dato="`${carrito.cliente.tipo_codigo} - ${carrito.cliente.tipo}`")

            v-divider(vertical)

            //- v-col.py-0.px-4(cols="2")
              div.mt-4(style="max-height: 500px !important; overflow-y: auto !important;")
                pre.text-caption {{ carrito }}

            v-col.py-0.px-4(cols="9")

              div.gap-10.align-center.py-2
                div.w150
                  div.text-h5.font-weight-bold.my-2 Datos para la entrega
                v-spacer
                v-btn.px-4(variant="tonal" rounded append-icon="mdi-window-close" @click="show = false") Cerrar

              Form(ref="form_datos" v-slot="{ errors }" :validation-schema="schema")
                table.w-100
                  tr
                    td.label Tipo de atención
                    td.dato 
                      Field(v-slot="{ field }" v-model="carrito.tipo_atencion" name="tipo_atencion")
                        v-select(
                          v-model="carrito.tipo_atencion"
                          item-value="codigo" item-title="descripcion"
                          :items="tipo_atencion"
                          :error-messages="errors.tipo_atencion" :hide-details="true" v-bind="field"
                          )
                        //- :return-object="false"
                    td.label Tipo de entrega
                    td.dato.w300
                      Field(v-slot="{ field }" v-model="carrito.tipo_entrega" name="tipo_entrega")
                        v-select(
                          v-model="carrito.tipo_entrega"
                          item-value="codigo" item-title="descripcion"
                          :items="tipos_entrega"
                          :error-messages="errors.tipo_entrega" :hide-details="true" v-bind="field"
                          )
                          //- :return-object="false"

                  tr 
                    td(colspan="4")
                      table.w-100
                        tr
                          td.label.w107 Lugar de entrega
                          td.dato.w-50(colspan="4")
                            Field(v-slot="{ }" v-model="carrito.lugar_entrega" name="lugar_entrega")
                              v-autocomplete(
                                v-model="carrito.lugar_entrega"
                                :items="carrito.cliente.anexos" item-value="anexo_codigo" item-title="anexo"
                                :error-messages="errors.lugar_entrega" :hide-details="true" 
                                )
                                //- v-bind="field"
                                //- :return-object="false"

                          td.label.w107 Agencia Transporte
                          td.dato.w-50(colspan="4") 
                            v-autocomplete(
                              v-model="carrito.agencia_transporte"
                              :items="carrito.cliente.transportes" 
                              :return-object="false"
                              clearable
                              persistent-clear
                              item-value="transporte_codigo" 
                              item-title="transporte"
                              )


              div.text-h5.font-weight-bold.mt-2.mb-2 Productos


              v-table.xtable.border.rounded(height="calc(100vh - 355px)" fixed-header)
                thead
                  th.w90 Código
                  th Producto
                  th.w60
                    i.mdi.mdi-percent.text-black.pr-1
                    span.font-weight-bolder(style="margin-bottom:4px") (+/-)
                  th.w60 Cantidad
                  th.w200.bg-blue-grey-lighten-5
                    i.mdi.mdi-pencil.text-grey.pr-2
                    span Almacén de entrega
                  th.w80 Precio
                  th.w80 Precio Total

                tbody
                  tr(v-for="(item, i) of carrito.productos" :key="i")
                    td.text-center.text-caption {{ item.producto_codigo }}
                    td {{ item.producto_descripcion }}
                    td.text-center {{ $numeral(item.porcentaje).format('0,0.00') }}%
                    td.text-center {{ item.cantidad }}
                    td.pa-0.ma-0
                      v-select.pa-0.ma-0(
                        v-model="item.almacen" 
                        variant="solo-filled" 
                        :rounded="0" flat :items="almacenes" 
                        :multiple="carrito.tipo_atencion?.codigo == 2"
                        :return-object="false"
                        item-value="codigo"
                        :disabled="!carrito.tipo_atencion"
                        @update:model-value="onChange"
                      )
                    td.text-right {{ $numeral(item[cmp_precio_moneda]).format('0,0.00') }}
                    td.text-right.font-weight-bold {{ $numeral(item[cmp_precio_moneda] * item.cantidad).format('0,0.00') }}


              div.gap-20.align-center.pr-2.pt-3
                //- div.w250.mt-2
                  v-filtro-input(v-model="filtro" placeholder="Fitlrar...")
                v-spacer
                div.gap-4.flex-column.align-center
                  span.text-h4.font-weight-bold {{ $numeral(fn_vventa(carrito.importe)).format('0,0.00') }}
                  span.text-caption VALOR VENTA
                div.gap-4.flex-column.align-center
                  span.text-h4.font-weight-bold {{ $numeral(fn_igv(carrito.importe)).format('0,0.00') }}
                  span.text-caption I.G.V.
                div.gap-4.flex-column.align-center.bg-grey-lighten-2.rounded.pa-1.px-3
                  span.text-h3.font-weight-bold {{ $numeral(carrito.importe).format('0,0.00') }}
                  span.text-caption TOTAL 
                    span.font-weight-bold {{ carrito.moneda == 'US' ? 'USD' : 'S/' }}


      v-divider.mt-2
      v-card-actions.justify-space-around.my-2
        //- v-btn(variant="tonal" append-icon="mdi-window-close" @click="show = false") Cerrar
        v-btn.px-5(
          variant="flat" size="large" rounded color="blue-grey-lighten-4" append-icon="mdi-receipt-text mdi-16px"
          disabled
          )
          span.text-h5 Guardar como cotización
        v-btn.px-5(
          variant="flat" size="large" rounded color="blue-grey" append-icon="mdi-receipt-text-check mdi-16px"
          @click="guardar_pedido()"
          )
          span.text-h5 Guardar como <b>Pedido</b>

</template>
<style scoped>
.label,
.dato {
  /* font-family: 'Courier New', Courier, monospace; */
  letter-spacing: 0px;
}

.label {

  /* display: flex; */
  justify-content: end;

  padding: 4px 8px;
  background-color: rgb(236 236 236 / 0.6) !important;
  border-radius: 5px 0 0 5px;
  font-size: 11px;
  text-align: right;
  font-variation-settings: 'wght' 550;
  width: 110px;
}

.dato {
  padding: 2px 8px;
  font-size: 12px;
  /* width: 200px; */
  width: auto;
  color: black !important;
}

.xtable {
  border-collapse: collapse;

  thead {
    background-color: white;

    th {
      border-bottom: 1px solid #e0e0e0;
      font-size: 10px;
      letter-spacing: 0;
      font-variation-settings: "wght" 600;
      padding: 6px 4px;
    }
  }

  tbody {
    tr {
      height: 0;
      padding: 0;

      td {
        font-size: 12px;
        padding: 2px 6px;
        height: auto;
      }
    }
  }
}
</style>