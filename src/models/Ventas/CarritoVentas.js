import { $http } from '@/plugins'
// import { $http } from '@/plugins/provides'
// const api = 'Tablas/Almacenes'

export default class CarritoVentas {
  // constructor() {
  //   this.linea_grupo = null
  //   this.linea_codigo = null
  //   this.descripcion = null
  //   this.orden = null
  // }

  async listado(params) {
    return await $http.get(`carrito`, { params }).then(r => r.data)
  }

  async configuracion(params) {
    return await $http.get(`carrito/configuracion`, { params }).then(r => r.data)
  }

  async guardar_pedido(params) {
    return await $http.post(`carrito/pedido`, params).then(r => r.data)
  }

  async pedido_pdf(params) {
    console.log(params)
    // return await $http.get(`carrito/pdf`, params).then(r => r.data)
    return await $http.get(`carrito/pdf`, { params, responseType: 'blob' }).then(r => r.data)
  }

  // async listar_empresa_agencia({ base, agencia }) {
  //   return await $http.get(`${api}/listar_empresa_agencia`, { params: { base, agencia } }).then(r => r.data)
  // }

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
