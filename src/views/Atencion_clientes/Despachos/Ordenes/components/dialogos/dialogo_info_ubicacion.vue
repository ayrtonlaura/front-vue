<script setup>
import {
  ref
  // , watch, onMounted
} from 'vue'
import {
  MapboxMap, MapboxMarker,
  // MapboxGeolocateControl,
  MapboxNavigationControl
} from '@studiometa/vue-mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { computed } from 'vue';

const show = ref(false)
const mapboxMap = ref()
// const mapa = ref()

const estilo = ref('streets-v11')
const posi = ref([])

const mapaEstilo = computed(() => {
  return `mapbox://styles/mapbox/${estilo.value}`
})

const data = ref({
  posi: [],
  direccion: ''
})

const ver_ubicacion = (item) => {
  data.value = item
  console.log("onVerUbicacion()", item.ubicacion);
  let ubi = item.ubicacion.split(",")
  let lat = ubi[0], lng = ubi[1]
  posi.value = [lng, lat]
  show.value = true
}

defineExpose({
  ver_ubicacion
})
</script>
<template lang="pug">

v-dialog(v-model="show" width="700")
  //- @mb-created="(mapInstance) => mapa = mapInstance"
  MapboxMap.rounded(
    ref="mapboxMap"
    style="height: calc(100vh - 55px); width: 100%"
    access-token="pk.eyJ1IjoiY29kZXhpYW4yMCIsImEiOiJjbGxlYnUydHgwZ2xpM2pta2p0OXM4M2NjIn0.cjNUkWUHe0PyTH2PTxr3aA"
    :map-style="mapaEstilo" 
    :center="posi"
    :zoom="16"
    :min-zoom="10"
    :pitch="0"
  )
    MapboxNavigationControl(position="top-right")
    MapboxMarker(popup :lng-lat="posi")
      template(#popup)
        span.text-h6 {{ data.direccion }}

  div.mapa_estilos
    label
      input(v-model="estilo" type="radio" value="streets-v12" checked="checked")
      span Streets
    label
      input(v-model="estilo" type="radio" value="light-v11")
      span Light
    label
      input(v-model="estilo" type="radio" value="satellite-streets-v12")
      span Satellite

  div.coordinates
    pre Lontigud: {{ posi[0] }}
    pre Latitud: {{ posi[1] }}
</template>
<style lang="scss">
// .wrap {
// padding: 10px;
// display: flex;
// flex-direction: row;
// width: 100%;
// gap: 10px;
// flex: 1;

// .one {
// width: 300px;
// }

// .two {
// flex: 1;
// position: relative;
// }
// }

.coordinates {
  background: rgba(0, 0, 0, 0.5);
  color: #fff;
  position: absolute;
  bottom: 30px;
  right: 15px;
  padding: 5px 10px;
  margin: 0;
  font-size: 11px;
  line-height: 16px;
  border-radius: 3px;
}

.mapa_estilos {
  position: absolute;
  background: #f2f2f2;
  padding: 5px 10px;
  top: 0;
  display: flex;
  gap: 15px;
  border-radius: 2px 0 6px 0;

  label {
    display: flex;
    gap: 5px;
    font-size: 12px;
  }
}
</style>