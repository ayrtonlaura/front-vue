import { $http } from '@/plugins'
// import { $http } from '@/plugins/provides'
const api = 'Tablas/Almacenes'

export default class Almacenes {
  // constructor() {
  //   this.linea_grupo = null
  //   this.linea_codigo = null
  //   this.descripcion = null
  //   this.orden = null
  // }

  async listar(params) {
    // $eventBus.$emit('overlay', { texto: 'Listando lineas..' })
    return await $http.get(`${api}/listar`, { params }).then(r => r.data)
    // .finally(() => {
    // $eventBus.$emit('overlay', false)
    // })
  }

  async listar_empresa_agencia({ base, agencia }) {
    return await $http.get(`${api}/listar_empresa_agencia`, { params: { base, agencia } }).then(r => r.data)
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
