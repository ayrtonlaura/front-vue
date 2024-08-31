<script>
export default {
  name: 'header-cell',
  data() {
    return {
      estado: ""
    }
  },
  mounted() {
    // console.log(this.params)
    this.params.column.addEventListener('sortChanged', this.onSortChanged)
    this.onSortChanged()
  },
  methods: {
    invokeParentMethod() {
      // this.params.context.componentParent.porcetanjeColumna(this.params.displayName, this.params.column.colDef.field)
    },

    onSortChanged() {
      this.estado = ''
      if (this.params.column.isSortAscending()) {
        this.estado = 'asc'
      } else if (this.params.column.isSortDescending()) {
        this.estado = 'desc'
      } else {
        this.estado = ''
      }
    },

    onSortRequested(event) {
      let order = ''
      if (this.estado == '') order = 'asc'
      if (this.estado == 'asc') order = 'desc'
      if (this.estado == 'desc') order = ''
      this.params.setSort(order, event.shiftKey)
    }
  }
}
</script>
<template lang="pug">
div.xboton.fill-height(:class="params.color" @click="params.column.colDef.sortable && onSortRequested($event)")
  span {{ params.displayName }}
  template(v-if="params.column.colDef.tooltip")
    v-btn.fondo(v-tippy="{ trigger : 'click', hideOnClick : true }" :content="params.column.colDef.tooltip" icon x-small @click.stop)
      v-icon(size="12") mdi-information
  v-icon(v-if="estado == 'asc'" size="10") mdi-arrow-up
  v-icon(v-if="estado == 'desc'" size="10") mdi-arrow-down
</template>
<style lang="scss">
.xboton {
  padding: 2px 0px;
  display: flex;
  width: 100%;
  min-width: 0;
  flex-grow: 1;
  align-items: center;

  span {
    margin: 0;
    text-align: center;
    flex: 1;

    white-space: pre-wrap;
    word-break: normal;

    color: #788291;
    font-weight: normal;
    font-size: 10px;
  }
}
</style>
