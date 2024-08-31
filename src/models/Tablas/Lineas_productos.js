import { $http } from '@/plugins'
// import { $http } from '@/plugins/provides'
// const api = 'Lineas_productos'

export default class Linea {
  // constructor() {
  //   this.linea_grupo = null
  //   this.linea_codigo = null
  //   this.descripcion = null
  //   this.orden = null
  // }

  async listar(params) {
    return await $http.get(`lineas_productos`, { params }).then(r => r.data)
  }

  // nuevo() {
  //   console.log('nuevo')
  // }

  // async find(codigo) {
  //   $eventBus.$emit('overlay', { texto: 'Información del registro..' })

  //   await $http
  //     .get('Integral/Usuarios/Usuario/usuario', { params: { codigo } })
  //     .then(item => {
  //       Object.assign(this, item)
  //     })
  //     .finally(() => {
  //       $eventBus.$emit('overlay', false)
  //     })
  // }
}
