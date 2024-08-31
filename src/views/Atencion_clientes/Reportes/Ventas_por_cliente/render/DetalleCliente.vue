<script setup></script>

<template lang="pug">
div
  v-container.pa-0(fluid)
    v-row(dense)
      v-col(cols="12")
        v-container(fluid)
          v-row(dense)
            v-col.pa-0(cols="3")
              div
                span.text-primary.font-variation-450.text-h7 RUC_CLI
            v-col.pa-0(cols="1")
              div
                span  :
            v-col.pa-0(cols="8")
              div
                span.font-variation-450   {{ params.data.codigo }} 
            v-col.pa-0(cols="3")
              div
                span.text-primary.font-weight-bold Nombre Cliente
            v-col.pa-0(cols="1")
              div
                span  :
            v-col.pa-0(cols="8")
              div
                span.font-variation-450 {{ params.data.NombreCliente }}    
</template>
