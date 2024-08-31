<script>
export default { name: 'cmp-editar-producto' }
</script>
<script setup>
import { reactive, inject, computed, ref, watch, toRaw } from "vue"
import { $numeral, $swal } from "@/plugins"

const { carrito, config } = inject("prov_carrito")

const imagen = "https://tienda.jchllantas.com.pe/catalogo/bodega/COMFORSER/CF2000.jpgx"

const number = {
  separator: ',',
  decimal: '.',
  nullValue: 0,
  precision: 2,
  masked: true,
}

const show = ref(false)
const is_image_loaded = ref(false)

watch(() => show.value, (v) => {
  if (v) {
    is_image_loaded.value = false;
    const img = new Image();
    img.onload = () => is_image_loaded.value = true;
    img.src = imagen;
  }
})

function cancelar() {
  show.value = false
}

const data = reactive({
  producto_codigo: '',
  producto_descripcion: '',
  cantidad: 1,
  precio_us: 0,
  precio_mn: 0,
  porcentaje: 0,
  igv: 15,
  // precio_lista: 0
})

function editar(item) {
  Object.assign(data, item)
  // console.log(data);
  show.value = true
}

const mas = () => data.cantidad += 1

const menos = () => data.cantidad > 1 ? data.cantidad -= 1 : 1

function aceptar() {

  if (carrito.forma == '003' && cmp_porcentaje.value < 0) {
    return $swal.fire("No permitido", "Cuando se vende con <b>Tarjeta de crédito</b>,<br>el porcentaje no puede ser negativo.", "error")
  }

  let index = carrito.productos.findIndex(item => item.producto_codigo == data.producto_codigo)
  // carrito.productos[index].cantidad = data.cantidad
  // carrito.productos[index].precio = data.precio
  // carrito.productos[index].porcentaje = data.porcentaje
  carrito.productos[index] = Object.assign({}, toRaw(data))
  show.value = false
}

function precio_moneda(item) {
  // console.log(item);
  return carrito.moneda == 'US' ? item.precio_us : item.precio_mn // * carrito.tipo_cambio
}

const subtotal = computed(() => {
  return data.cantidad * precio_moneda(data)
})

const cmp_porcentaje = computed({
  get() {
    return data.porcentaje
  },
  set(v) {
    if (carrito.moneda == 'US') {
      data.precio_us = parseFloat(data[carrito.precio]) + parseFloat((data[carrito.precio] * v) / 100)
    }
    if (carrito.moneda == 'MN') {
      let cm = parseFloat(data[carrito.precio]) + parseFloat((data[carrito.precio] * v) / 100)
      data.precio_mn = conversion_a_soles(cm)
    }
    data.porcentaje = v
  }
})

const cmp_precio = computed({
  get() {
    // return precio_moneda(data)
    return carrito.moneda == 'US' ? data.precio_us : data.precio_mn
  },
  set(v) {

    if (carrito.moneda == 'US') {
      let calc = ((v - data[carrito.precio]) / data[carrito.precio]) * 100
      cmp_porcentaje.value = calc.toFixed(2)
    }

    if (carrito.moneda == 'MN') {
      let m = data[carrito.precio] * carrito.tipo_cambio
      let calc = ((v - m) / m) * 100
      cmp_porcentaje.value = calc.toFixed(2)
    }

    if (carrito.moneda == 'US') data.precio_us = v
    if (carrito.moneda == 'MN') data.precio_mn = v
  }
})

function conversion_a_soles(valor) {
  return carrito.moneda == 'US' ? valor : (valor * carrito.tipo_cambio).toFixed(config.redondeo)
}

defineExpose({ show, editar })
</script>
<template lang="pug">
v-dialog(v-model="show" :width="is_image_loaded ? 600 : 320" persistent no-click-animation)

  v-card
    v-toolbar(density="compact")
      div.pl-3.gap-3.flex-column
        span.text-h5 Editar producto 
        span.text-caption.text-grey-darken-2 Código: {{ data.producto_codigo }}
      v-spacer
      v-btn(icon="mdi-window-close" @click="cancelar()")
    v-card-text.px-3.py-2

      div.gap-10
        div(v-if="is_image_loaded")
          v-img(:src="imagen" width="280")
        div.w-100
          div.gap-5.flex-column.pa-1
            div.text-h5.text-center
              span.line-17 {{ data.producto_descripcion }}

          div.gap-20.flex-column.align-center.my-3.justify-center

            div.gap-0.justify-space-around.w-100
              div.gap-5.flex-column.text-center
                div.gap-15.align-center
                  v-btn(icon="mdi-minus mdi-16px" variant="tonal" size="26" @click="menos()")
                  span.text-h3.font-weight-bold {{ data.cantidad }}
                  v-btn(icon="mdi-plus mdi-16px" variant="tonal" size="26" @click="mas()")
                span.text-h6 Cantidad

              div.gap-5.flex-column.text-center
                span.text-h3.font-weight-bold {{ $numeral(conversion_a_soles(data[carrito.precio])).format('0,0.00') }}
                span.text-h6 Precio {{ config.precios.find(item => item.field == carrito.precio).headerName }}

            //- template(v-if="carrito.forma == '001'")
            div.gap-20
              div.w80.ml-5
                v-text-field.text-right(v-model="cmp_porcentaje" v-number="number" label="Porcentaje" suffix="%" @focus="$event.target.select()")
              div.w90.mr-2
                v-text-field.text-right(v-model="cmp_precio" v-number="number" label="Importe" :prefix="carrito.moneda == 'US' ? 'USD' : 'S/'" @focus="$event.target.select()")

            div.mt-n3
              span.text-h6 SubTotal:
              span.font-weight-bold.text-h5.pl-1 {{ $numeral(subtotal).format('0,0.00') }}

    //- pre.text-caption {{ data }}
    v-divider
    v-card-actions.gap-0.justify-space-around
      v-btn(variant="text" prepend-icon="mdi-undo" @click="cancelar()") Cancelar
      v-btn.px-4(variant="tonal" append-icon="mdi-check" @click="aceptar()") Aceptar
</template>