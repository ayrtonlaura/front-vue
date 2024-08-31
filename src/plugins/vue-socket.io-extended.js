// import VueSocketIOExt from 'vue-socket.io-extended'
import { io } from 'socket.io-client'
import { reactive } from 'vue'

const socket = io.connect(import.meta.env.VITE_SOCKET, {
  autoConnect: false, // true,
  timeout: 2000,
  reconnection: true,
  reconnectionDelay: 5000,
  reconnectionAttempts: 5
  // withCredentials: true
})

export const state = reactive({
  connected: false,
  emit: (arm, args) => {
    socket.emit(arm, args)
  },
  fooEvents: null,
  logoutEvent: null
})

socket.on('connect', () => {
  state.connected = true
})

socket.on('disconnect', () => {
  state.connected = false
})

socket.on('chat-message', args => {
  state.fooEvents = args
})

socket.on('force-logout', () => {
  state.logoutEvent = [true]
})

export default state
