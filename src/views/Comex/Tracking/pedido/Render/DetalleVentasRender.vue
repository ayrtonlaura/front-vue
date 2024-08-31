<script setup>
import { ref } from 'vue'
// import ApexCharts from 'apexcharts'
// import VueApexCharts from 'vue3-apexcharts'
const detailDialog = ref(false)
function openDetail() {
  detailDialog.value = true
}
function closeDialog() {
  detailDialog.value = false
}

const series = ref([
  {
    name: '2023',
    data: [44, 55, 57, 56, 61, 58, 63, 60, 66, 30, 50]
  },
  {
    name: '2024',
    data: [76, 85, 101, 98, 87, 105, 91, 114, 94, 60, 95]
  }
])

const chartOptions = ref({
  chart: {
    type: 'bar',
    height: 350
  },
  plotOptions: {
    bar: {
      horizontal: false,
      columnWidth: '55%',
      endingShape: 'rounded'
    }
  },
  dataLabels: {
    enabled: false
  },
  stroke: {
    show: true,
    width: 2,
    colors: ['transparent']
  },
  xaxis: {
    categories: ['Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dic']
  },
  yaxis: {
    title: {
      text: 'Cantidades'
    }
  },
  fill: {
    opacity: 1
  },
  tooltip: {
    y: {
      formatter: function (val) {
        return '$ ' + val + ' thousands'
      }
    }
  }
})
</script>
<template lang="pug">
div
  v-btn(icon="mdi-magnify" variant="tonal" color="green-accent-4" size="x-small" @click="openDetail()")
  v-dialog(v-model="detailDialog" width="1200")
    v-card
      v-card-title.d-flex.justify-space-between.align-center
        div.text-h5.text-medium-emphasis.ps-2 JCH Comercial 2024 Detalle de Venta
        v-btn(@click="closeDialog()" icon="mdi-close" variant="tonal")
      v-card-text
        span.text-h3 Detalle de Ventas por Producto
        div
          apexchart(type="bar" height="350" :options="chartOptions" :series="series")
      v-card-actions
        v-btn(variant="tonal" @click="closeDialog()") Salir
</template>
