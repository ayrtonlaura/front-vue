<script>
export default { name: 'cmp-carrito' }
</script>
<script setup>
import { ref, inject } from 'vue'
import {
  $swal,
  $numeral
} from '@/plugins'
import cmpLetrero from './letrero.vue'
import cmpCliente from './clientes.vue'
import cmpCarrito from './carrito.vue'
import dialogo_pedido from './dialogos/dialogo_pedido.vue'
import { watch } from 'vue'

const { modo, toggle, carrito, Sw_limpiarCarrito } = inject('prov_carrito')

const componente_cliente = ref()

const cmpDialogoPedido = ref()

const tab = ref('carrito')


watch(() => Sw_limpiarCarrito.value, (v) => {
  if (v) {
    console.log('limpio: carrito: tab "carrito" focus');
    tab.value = "carrito"
  }
}, {
  deep: true
})

function ver_pedido() {

  let cliente_ok = componente_cliente.value.cliente_ok
  let cliente_tipo_ok = componente_cliente.value.cliente_tipo_ok

  let errores = []
  if (carrito.productos.length == 0) errores.push("&bull; El carrito no tiene productos")
  if (!carrito.cliente.codigo) errores.push("&bull; El cliente no ha sido seleccionado")

  if (carrito.cliente.codigo) {
    if (!cliente_tipo_ok) errores.push("&bull; El tipo de cliente no es PUBLICO FINAL")
    if (!cliente_ok) errores.push("&bull; No eres el vendedor actual del cliente seleccionado")
  }

  if (errores.length > 0) return $swal.fire('Revise lo siguiente:', errores.join("<br>"), 'warning')

  cmpDialogoPedido.value.show = true
}
</script>
<template lang="pug">
div.carrito.p-relative
  //- (:style="{width: modo == 'normal' ? '100%' : '50px' }")

  dialogo_pedido(ref="cmpDialogoPedido")

  div.normal(:class="{oculto: modo == 'mini'}")
    //- (v-if="modo == 'normal'")
    v-card.elevation-0.shadow(style="border-bottom:2px solid #dfe2f7")
      v-tabs.bg-indigo-lighten-5(v-model="tab" align-tabs="center" color="primary" stacked grow density="compact" height="50")
        v-tab(value="carrito") 
          v-icon mdi-cart
          span Carrito
        v-tab(value="cliente")
          v-icon mdi-account
          span Cliente
      v-divider
      v-card-text.pa-0
        v-window(v-model="tab")
          v-window-item(value="carrito" eager)
            cmpCarrito

          v-window-item(value="cliente" eager) 
            cmpCliente(ref="componente_cliente")

    div.gap-10.mt-3.mb-2
      v-btn.mx-auto.px-7(data-step="9" color="amber" height="40" rounded stacked @click="ver_pedido()")
        template(#default)
          div.gap-10
            span.text-h5 Continuar
            v-icon(size="14") mdi-arrow-right
    //- pre.text-caption {{ carrito }}
    cmpLetrero

  div.mini(:class="{oculto: modo == 'normal'}" @click="toggle")
    //- (v-if="modo == 'mini'" @click="toggle")
    div.gap-10.flex-column.justify-center.align-center
      v-btn.mb-1(icon="mdi-cart mdi-22px")
      div.gap-2.align-center.flex-column
        span.text-h6 {{ carrito.moneda == 'US' ? 'USD' : 'S/' }} 
        span.font-weight-bold.text-h4 {{ $numeral(carrito.importe).format('0,0.00') }}

      div.gap-2.align-center.flex-column
        span.font-weight-bold.text-h5 {{ carrito.cantidad }}
        span.text-h6 Productos


      template(v-if="carrito.cantidad>0")
        div.gap-2.align-center.flex-column
          span.font-weight-bold.text-h5 {{ carrito.forma_nombre }}
          span.text-h6 Forma de pago

        div.gap-2.text-center.flex-column
          span.font-weight-bold.text-h5 {{ carrito.precio_nombre }}
          span.text-h6 Tipo de precio

      //- pre.text-caption {{ carrito }}

      template(v-if="!carrito.cliente.codigo")
        div.gap-2.text-center.flex-column.align-center
          v-btn.mt-4.mb-2.text-grey(icon="mdi-account-off mdi-16px" size="26" color="grey-lighten-1")
          span.text-h6.text-grey Sin cliente seleccionado

      template(v-else)
        v-btn.mt-4(icon="mdi-account mdi-16px" size="26" variant="tonal")
        div.gap-2.align-center.flex-column
          div.gap-6.flex-column.text-center.px-0.text-h6.font-weight-bold
            span {{ carrito.cliente.codigo }}
            span.text-break {{ carrito.cliente.nombre }}

</template>
<style scoped>
.carrito {
  overflow: hidden;
  height: calc(100vh - 92px);


  .oculto {
    position: absolute;
    left: 100vw;
  }

  .shadow {
    /* border: 1px solid red; */
    border-radius: 5px;
    box-shadow: 0 0 2px 0 rgb(0 0 0 / 0.2) !important;
  }

  .normal {
    /* border-radius: 5px; */
    /* box-shadow: 0 0 2px 0 rgb(0 0 0 / .2); */
    /* background-color: red; */
    /* position: relative; */
    /* width: 330px; */
    /* height: calc(100vh - 100px); */

  }

  .mini {

    background-color: #dde8fd;
    box-shadow: 0 0 2px 0 rgb(196 217 255 / .2);
    border-radius: 5px;
    cursor: pointer;
    /* box-shadow: 0 0 2px 0 rgb(0 0 0 / .2); */
    /* background-color: green; */
    /* width: 100px; */
    /* height: 200px; */
    padding: 10px;
    transition: background-color ease 0.2s;

    &:hover {
      background-color: #b0ccff;
    }
  }
}
</style>