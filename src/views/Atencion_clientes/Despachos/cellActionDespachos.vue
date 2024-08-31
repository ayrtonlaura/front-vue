<script setup>
// import CmpEditar from './CmpAgregar.vue'
// import CmpEliminar from './CmpEliminar.vue'
// import CmpImprimir from './cmpImprimir.vue'
import { ref } from 'vue'
</script>
<template lang="pug">

v-container.pa-1(fluid)
  v-row(dense)
    v-col.gap-8.justify-center
      //- v-btn(@click="openDialog" variant="tonal" color="cyan" v-tippy content="Ver editar" size="x-small" icon="mdi-archive-edit-outline")
      v-btn(@click='params.clicked(params.data)' variant="tonal" color="red" v-tippy content="eliminar" size="x-small" icon="mdi-delete-off")

</template>
