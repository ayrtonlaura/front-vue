<script>
export default { name: 'cmp-toast' }
</script>

<script setup>
defineProps({
  mensaje: { type: String, default: '' },
  show: { type: Boolean, default: false }
})
</script>

<template lang="pug">
transition(name="fade")
  div.toast(v-show="show")
    v-progress-circular(:size="22" :width="1" color="primary" indeterminate)
    span {{ mensaje }}
</template>

<style scoped lang="scss">
.toast {
  position: absolute;
  right: 15px;
  top: 40px;
  /* border: 1px solid red; */
  box-shadow: 0 0 10px 0 rgb(0 0 0 / 0.1);

  /* background-color: red; */
  background-color: rgb(242 246 254 / 0.2);
  backdrop-filter: blur(5px);

  padding: 8px 10px;
  border-radius: 6px;
  z-index: 9999 !important;

  display: flex;
  gap: 10px;
  align-items: center;

  span {
    font-size: 13px;
  }
}
</style>
