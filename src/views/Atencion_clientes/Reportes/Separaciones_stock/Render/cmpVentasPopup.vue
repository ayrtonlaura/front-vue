<script setup>
import { ref } from 'vue'
const mostrar_informacion = ref(false)

function showA() {
  mostrar_informacion.value = true
}

defineExpose({ showA })
</script>

<template lang="pug">
v-dialog(v-model="mostrar_informacion" scrollable eager max-width="720")
  v-card.pa-6
    v-row(dense)
      v-col.resultado(cols="12")
        v-row
          v-col(cols="6")
            p.negrita Guía 5170263029 
              span (23/10/2023)
            p Almacén: 
              span 9004 - LIM FRESNOS L-5
          v-col(cols="6")
            p.negrita Ref. BV B5200010660 
            p Vendedor: 
              span VENTA WEB

      v-col.resultado(cols="12")
        table.cabecera
          tbody
            tr
              td(colspan="3")
                label.label Cliente
                |  QUISPE PAQUI HYNO FRANKLIN
            tr
              td(colspan="3")
                label.label Destino
                |  CALLE LOS FRESNOS S/N LIMA LIMA LURIN

        table.detalle
          thead
            tr
              th Código
              th Descripción
              th Cantidad
          tbody
            tr
              td.text-center LTR1500519
              td NTCO: 205/70 R15 96H SP-302 A/T AUSTONE TL
              td.text-center 1
            tr
              td.totVacio(colspan="2")
              td.totCantidad 1
        

        table.cabecera
          tbody
            tr
              td
                label.label Glosa
                | 01 - VENTA
              td
                label.label Movimiento
                | 01 - GUIA CONTRA FACTURA
            tr
              td
                label.label Usuario
                | MAOB - MARIA ANGELICA OC BARBA
              td
                label.label Fec. Emisión
                | 23/10/2023 12:18:59
                
    v-btn(@click="mostrar_informacion = false") cerrar


</template>
<style lang="scss" scoped>
.cabecera {
  margin-top: 10px;
}
.resultado table.cabecera {
  width: 100%;
  border-collapse: collapse;
  margin: 3px auto;
}

.resultado table.cabecera td {
  border: 1px solid #ccc;
  padding: 3px;
}
.resultado label.label {
  font-size: 11px;
  color: #5d5d5d;
  font-weight: normal;
  background-color: #e8e8e8;
  padding: 3px 7px;
  border-radius: 3px;
  position: relative;
  margin-right: 10px;
  display: inline-block;
}

.resultado {
  margin: 5px auto 40px auto;
  border-top: 3px solid rgba(108, 108, 108, 0.1);
  border-bottom: 3px solid rgba(108, 108, 108, 0.1);
  border-radius: 5px;
  max-width: 850px;
  transition: all 0.3s;
}
.negrita {
  border: none;
  margin: calc(2rem - 0.14285714em) 0 1rem;
  padding: 0 0;
  font-family: Lato, 'Helvetica Neue', Arial, Helvetica, sans-serif;
  font-weight: 700;
  line-height: 1.28571429em;
  text-transform: none;
  color: rgba(0, 0, 0, 0.87);
}
.resultado table.detalle {
  width: 100%;
  border-collapse: collapse;
  margin: 3px auto;
}
.resultado table.detalle thead th {
  border: 1px solid #ccc;
  background: rgb(241, 241, 241);
  text-align: center;
}
.resultado table.detalle td {
  border: 1px solid #ccc;
  padding: 0 4px;
}
.resultado table.detalle td.totVacio {
  border: 0 none;
}
.resultado table.detalle td.totCantidad {
  text-align: center;
  font-weight: bold;
  background: rgb(241, 241, 241);
}
</style>
