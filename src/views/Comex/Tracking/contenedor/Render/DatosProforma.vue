<script setup>
import { reactive } from 'vue'
// import { VDateInput } from 'vuetify/labs/VDateInput'

// import { ref, watch } from 'vue'
//

const proforma = reactive([])
</script>
<template lang="pug">

v-card.fill-height.text-primary(prepend-icon="mdi-account-plus" variant="flat")
  template(v-slot:title)
    p.text-h4.text-primary Datos
  v-card-text
    v-row.fill-height(dense)
      
      v-col(cols="9")
        v-radio-group.justify-space-around.w-100(inline)
          v-radio.w-50(label="Crear" color="primary" value="1")
          v-radio.w-50(label="Asignar" color="primary" value="2")
      v-col(cols="12")
        v-text-field(placeholder="Nro de CONTENEDOR" label="CONTENEDOR" required)
      
  v-divider

  v-card-text.pb-1
      v-btn.w-100(color="primary" text="CONTENEDORES" variant="tonal" @click="dialog = false")
  v-card-text.gap-10.justify-center
    div.w-75
      span.text-h5.font-weight-bold EMPRESA:
      span.text-h5 JCH  - 
      span.text-h5.font-weight-bold PEDIDO: 
      span.text-h5 0000000940 
      span.text-h5.font-weight-bold Proforma:
      span.text-h5   HSS20240611J 
      span.text-h5.font-weight-bold Contenedores:
      span.text-h5   HSS20240611J-1 [2024-07-23] - 
      span.text-h5.font-weight-bold B/L:
      span.text-h5  QGD0833392 2024-06-24
  v-card-actions
    v-spacer
    v-btn.w-100( prepend-icon="mdi-content-save-all" color="success" text="Guardar" variant="tonal" @click="dialog = false")

</template>
