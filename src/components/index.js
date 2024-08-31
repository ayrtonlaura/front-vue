/* eslint-disable vue/component-definition-name-casing, vue/multi-word-component-names */

import Blocking from './common/Blocking'
import agGrid from '@/components/material/agGrid'

import VFiltroInput from '@/components/material/VFiltroInput'
import VFecha from '@/components/material/VFecha'
import VFechaSingle from '@/components/material/VFechaSingle'

import VConfigEntorno from './material/VConfigEntorno.vue'
import VBox from './material/VBox.vue'

export function registrar(app) {
  app.component('Blocking', Blocking)
  app.component('agGrid', agGrid)
  app.component('VFiltroInput', VFiltroInput)
  app.component('VFecha', VFecha)
  app.component('VFechaSingle', VFechaSingle)
  app.component('VConfigEntorno', VConfigEntorno)
  app.component('VBox', VBox)
}
