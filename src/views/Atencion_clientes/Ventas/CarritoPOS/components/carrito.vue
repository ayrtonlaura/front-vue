<script>
export default { name: 'cmp-carrito' }
</script>
<script setup>
import { ref, inject } from 'vue'
import { $numeral, $swal } from '@/plugins'
import dialogo_editar_producto from './dialogos/dialogo_editar_producto.vue';
import { computed } from 'vue';
import { watch } from 'vue';
// import { onMounted } from 'vue';
// import { nextTick } from 'vue';

const {
  // formas,
  carrito, config,
  Sw_limpiarCarrito
} = inject('prov_carrito')

const cmp_dialogo_editar_producto = ref()
const item_active = ref(-1)

function eliminar(item) {

  $swal.fire({
    title: "Eliminar el producto?",
    text: item.descripcion,
    showConfirmButton: false,
    showDenyButton: true,
    showCancelButton: true,
    denyButtonText: `Si, eliminar`,
    cancelButtonText: `Cancelar`,
    focusCancel: true
  }).then((result) => {
    if (result.isDenied) {
      let index = carrito.productos.findIndex(row => row.producto_codigo == item.producto_codigo)
      carrito.productos.splice(index, 1)
    }
  });

}

watch(() => carrito.precio, (m) => {
  carrito.productos.forEach(el => {
    el.precio_us = el[m]
    el.precio_mn = (el[m] * carrito.tipo_cambio).toFixed(config.redondeo)
    el.porcentaje = 0
  });
})

watch(() => carrito.moneda, () => {
  carrito.productos.forEach(el => {
    el.precio_us = el[carrito.precio]
    el.precio_mn = (el[carrito.precio] * carrito.tipo_cambio).toFixed(config.redondeo)
    el.porcentaje = 0
  });
})

watch(() => carrito.productos, (items) => {
  // console.log(...config.precios);
  items.forEach(el => {
    let menor = Math.min(...config.precios.map(it => el[it.field]))
    if (carrito.moneda == 'US') {
      el.aprobado = (el.precio_us < menor) ? false : true
    }
    if (carrito.moneda == 'MN') {
      let soles = (menor * carrito.tipo_cambio).toFixed(config.redondeo)
      el.aprobado = (el.precio_mn < soles) ? false : true
    }
  })
}, {
  deep: true
})

const por_aprobar = computed(() => {
  let total = carrito.productos.reduce((acum, row) => {
    if (!row.aprobado) acum = acum + 1
    return acum
  }, 0)

  return total > 0
})

const total = computed(() => {
  let total = carrito.productos.reduce((acum, row) => {
    return acum = acum + (row.cantidad * precio_moneda(row))
  }, 0)
  return total
})

const total_cantidad = computed(() => {
  let total = carrito.productos.reduce((acum, row) => {
    return acum = acum + row.cantidad
  }, 0)
  return total
})

watch(() => total.value, (v) => {
  carrito.importe = v
})

watch(() => total_cantidad.value, (v) => {
  if (!cmp_forma_precio.value) cmp_forma_precio.value = config.formas[0]
  carrito.cantidad = v
})

function onClickOutside() {
  item_active.value = -1
}

function editar(item) {
  cmp_dialogo_editar_producto.value.editar(item)
}

function precio_moneda(item) {
  return carrito.moneda == 'US' ? item.precio_us : item.precio_mn // valor * carrito.tipo_cambio
}

function conversion_a_soles(valor) {
  return carrito.moneda == 'US' ? valor : (valor * carrito.tipo_cambio).toFixed(config.redondeo)
}

const cmp_forma_precio = ref()

watch(() => cmp_forma_precio.value, (v) => {
  if (!v) return
  carrito.forma = v.forma_id
  carrito.forma_nombre = v.nombre

  carrito.precio = v.precio_id
  carrito.precio_nombre = v.precio
})

watch(() => Sw_limpiarCarrito.value, (v) => {
  if (v) {
    console.log('limpio: carrito forma de pago y productos');
    cmp_forma_precio.value = null
  }
}, {
  deep: true
})

</script>
<template lang="pug">
div.pa-2

  dialogo_editar_producto(ref="cmp_dialogo_editar_producto")

  template(v-if="carrito.productos.length == 0")
    div.gap-2.flex-column.align-center.py-4.text-grey-darken-1
      i.mdi.mdi-cart-off.mdi-24px.text-grey-lighten-1.mb-1
      span.text-h6 Carrito vacío
      span.text-caption Sin productos agregados


  template(v-else)
    div.gap-8.w-100.pa-2
      v-select.w-100(v-model="cmp_forma_precio" label="Forma de Pago (Precio)" :items="config.formas" item-title="nombre")
        template(#selection="{ item }")
          div.gap-4.align-center
            span.text-h5.font-weight-bold {{ item.raw.nombre }}
            span.text-caption.font-weight-bold &mdash; {{ item.raw.precio }}

        template(#item="{ props, item }")
          v-list-item.pb-2(v-bind="props")
            div.gap-4.flex-column: span.text-caption {{ item.raw.precio }}

    div.gap-6.flex-column.pa-1(
      v-click-outside="onClickOutside"
      style="overflow-y: auto; max-height:calc(100vh - 400px);"
      )
      div.div-producto.shadow.py-1.px-3.gap-10.justify-space-between.align-center(
        v-for="(producto, index) of carrito.productos" 
        :key="`key_${producto}`"
        :class="item_active == index ? 'activo' : ''"
        @click="item_active = index"
        )

        i.mdi.mdi-circle-medium.dot-obs(v-if="!producto.aprobado")

        div.w25
          span.font-weight-bold.text-h5 {{ producto.cantidad }} 
          span.text-h5  x

        div.flex-fill.div-menu.text-h6.flex-column.gap-2
          span.line-16 {{ producto.producto_descripcion }}
          span.text-h6 Precio: {{ $numeral(precio_moneda(producto)).format('0,0.00') }}


        div.xw40.text-right.gap-4.flex-column
          span.text-h5.font-weight-bold {{ $numeral(precio_moneda(producto) * producto.cantidad).format('0,0.00') }}

          template(v-if="precio_moneda(producto) != conversion_a_soles(producto[carrito.precio])")
            span.text-h6.text-decoration-line-through {{ $numeral(conversion_a_soles(producto[carrito.precio])).format('0,0.00') }}

        div.btn-opcion
          v-btn(color="light" rounded="sm" icon="mdi-pencil mdi-16px text-indigo" size="30" @click="editar(producto)")
          v-btn(color="light" rounded="sm" icon="mdi-window-close mdi-16px text-red" size="30" @click="eliminar(producto)")

    div.justify-end.gap-10.align-center.mt-1.pr-3
      div.gap-0.align-center(v-if="por_aprobar")
        i.mdi.mdi-circle-medium.text-red
        span.text-h6.text-red.font-weight-bold Requerirá <u>APROBACIÓN</u>

      v-spacer

      span.text-h6 {{ carrito.moneda == 'US' ? 'USD' : 'S/' }}
      span.font-weight-bold.text-h4 {{ $numeral(total).format('0,0.00') }}

  //- pre.text-caption {{ carrito }}
  //- pre.text-caption {{ carrito.productos }}

</template>
<style scoped>
.shadow {
  border-radius: 5px;
  box-shadow: 0 0 2px 0 rgb(0 0 0 / 0.2) !important;
}

.div-producto {

  position: relative;
  transition: all ease .15s;

  .dot-obs {
    position: absolute;
    top: 0px;
    left: 2px;
    color: red;
  }

  .div-menu {
    line-height: 18px;
  }

  .btn-opcion {
    z-index: 99999;
    position: absolute;
    right: 7px;
    margin: auto;
    opacity: 0;
    display: none;
    display: flex;
    gap: 7px;
    transition: all ease .15s;
    pointer-events: none
  }

}

.div-producto.activo {
  background-color: #e0deff;

  .btn-opcion {
    display: inline-flex;
    opacity: 1;
    pointer-events: all
  }
}
</style>