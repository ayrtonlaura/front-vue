<script>
export default { name: 'alerta-vue' }
</script>

<script setup>
import { ref, onMounted } from "vue"

function showAlerta() { }

function fetchNotifications() {
  // $.ajax({
  // 	url: "/home/fetch_long",
  // 	type: 'GET',
  // 	cache: false,
  // 	error: function() {
  // 		setTimeout(fetchNotifications, 3000);
  // 	},
  // 	success: function(data) {
  // 		handleNotif(data);
  // 		setTimeout(fetchNotifications, 3000);
  // 	}
  // });
  handleNotif({});
  setTimeout(fetchNotifications, 3000);
}

function handleNotif() {
  console.log('handleNotif()');
}

onMounted(() => {
  // fetchNotifications();
})
</script>

<template lang="pug">
div
  v-btn(v-tippy content="Notificaciones" icon="mdi-bell mdi-16px" color="blue" variant="tonal" size="26" @click="showAlerta")
</template>