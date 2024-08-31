<script setup>
import { ref, computed, inject } from 'vue'
const { records, openPopup } = inject('provide_ventas_por_cliente')
const filtro_inv = ref('')

// TODO /**Nueva Proiedad Computada */
const invoices_cmp = computed(() => {
  return records.value
  // let data = records.value
  // let filtro = filtro_inv.value
  // let filtro_campos = ['agentprincipaladdress1', 'agentfirstname', 'agentlastname']

  // if (!filtro || filtro.trim() == '' || data.length == 0) return data
  // filtro = filtro.toLowerCase().split(/\s/)
  // filtro = filtro.filter(el => el != '')
  // let valores = filtro_campos

  // let result = []

  // data.filter(row => {
  //   let hallados = []
  //   let texto = ''
  //   valores.forEach(item => (texto += row[item] ? row[item].toLowerCase() : ''))

  //   filtro.forEach(q => {
  //     if (texto.includes(q)) hallados.push(row)
  //   })
  //   if (hallados.length == filtro.length) result.push(hallados[0])
  // })
  // return [...result]
})

function highlight(texto, filtro) {
  if (!filtro) return texto

  const keywords = filtro.trim().split(/\s+/).filter(Boolean) // Filtra palabras vacías
  const pattern = new RegExp(`(${keywords.join('|')})`, 'ig')

  if (!texto) return ''
  return String(texto).replace(pattern, match => `<mark class="highlight-text">${match}</mark>`)
}

defineExpose({ filtro_inv })
</script>
<template lang="pug">
div.resultado
  v-virtual-scroll(:height="300" :items="invoices_cmp" :item-height="200")
    template(#default="{ item }")
      div
        table.cabecera
          tbody
            tr
              td.documento(style="width:300px;")
                label Documento
                span.formPDF(title="Descargar documento") {{ item.agentprincipalzipcode }}
              td.fecha
                label Fec. Emisión
                span {{ item.principalzipcode }}
              td
                label Cond. Pago
                span {{ item.principalcountry }}
            tr
              td(colspan="3")
                label Cliente 
                span(v-html="highlight( item.agentlastname, filtro_inv )")

            tr
              td(colspan="2")
                label Vendedor
                span(v-html="highlight( item.agentfirstname, filtro_inv )")
              td.almacen
                label Almacén
                span {{ item.agentprincipaladdress1 }}
            tr
              td(colspan="2")
                label Glosa
                span {{ item.edad }}
              td
                label Pedido
                span {{ item.edad }}

        v-table.mt-2(density="compact" theme="high-contrast")
          thead
            tr
              th Cantidad
              th Por atender
              th Código
              th Descripción
              th Moneda
              th P. Unitario
              th Sub Total
          tbody
            tr
              td.cantidad 2
              td.cantidad 2
              td.codigo.text-center 2
              td 2
              td.moneda 2
              td.precio 2
              td.precio 2
            tr
              td.totCantidad 12
              td.totVacio(colspan="5")
              td.totPrecio 1,000.00

        table.pie
          tr
            td
              label Guías de atención              
              div.xpop.blue.cursor-pointer(@click="openPopup(item)") 
                span 5130061250  (23/10/2023)
      
</template>
<style lang="scss" scoped>
.resultado * {
  font-size: 12px;
}

.cabecera {
  width: 100%;
  border-collapse: collapse;
  margin: 3px auto;
}

.cabecera td {
  border: 1px solid #ccc;
  padding: 3px;
}

label {
  font-size: 11px;
  color: #5d5d5d;
  font-weight: normal;
  background-color: #e8e8e8;
  padding: 3px 7px;
  border-radius: 3px;
  position: relative;
  margin-right: 10px;
  display: inline-block;

  :after {
    content: '';
    display: block;
    position: absolute;
    top: 7px;
    left: 100%;
    width: 0px;
    height: 0;
    border-color: transparent transparent transparent #e8e8e8;
    border-style: solid;
    border-width: 6px;
  }
}

.detalle {
  width: 100%;
  border-collapse: collapse;
  margin: 3px auto;
}

.detalle thead th {
  border: 1px solid #ccc;
  background: rgb(241, 241, 241);
  text-align: center;
}

.cantidad {
  text-align: center;
  width: 65px;
}

.detalle td {
  border: 1px solid #ccc;
  padding: 0 4px;
}

td.totPrecio {
  text-align: right;
  font-weight: bold;
  padding-right: 7px;
  background: rgb(241, 241, 241);
}

.totCantidad {
  text-align: center;
  font-weight: bold;
  background: rgb(241, 241, 241);
}

.resultado {
  margin: 5px auto 40px auto;
  border-top: 3px solid rgba(108, 108, 108, 0.1);
  border-bottom: 3px solid rgba(108, 108, 108, 0.1);
  border-radius: 5px;
  max-width: 850px;
  transition: all 0.3s;
}

.pie td {
  border: 1px solid #ccc;
  padding: 4px;
}

.resultado table.pie {
  width: 100%;
  border-collapse: collapse;
  margin: 3px auto;
}

.xpop.blue {
  color: #2185d0;
  padding: 3px 6px;
  border-radius: 3px;
  margin-right: 4px;
  display: inline-block;
  border: 1px solid #2185d0;
}

.xpop.red {
  color: #fa1313;
  padding: 3px 6px;
  border-radius: 3px;
  border: 1px solid #fa1313;
}

.saldar {
  color: red;
  padding: 0px 7px;
  border-radius: 50%;
  display: inline-block;
  border: 1px solid red;
}

.formPDF {
  color: #2185d0;
}
</style>
