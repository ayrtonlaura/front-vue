import { $http } from '@/plugins'

// const api = 'Tablas/Clientes'

export default class Cliente {
  constructor() {
    // this.linea_grupo = null
    // this.linea_codigo = null
    // this.descripcion = null
    // this.orden = null
  }

  // Creacion en base de datos CAPACITACION (SDLima1)
  // async crear(params) {
  //   return await $http.post(`capacitacion/clientes`, { params }).then(r => r.data)
  // }

  async buscar(params) {
    // return await $http.get(`clientes`, { params }).then(r => r.data) // OK
    return await $http.get(`clientes`, { params }).then(r => r.data)
  }

  async busqueda_libre(params) {
    // return await $http.get(`clientes`, { params }).then(r => r.data) // OK
    return await $http.get(`clientes/busqueda_libre`, { params }).then(r => r.data)
  }

  async existe(params) {
    return await $http.get(`/clientes/existe`, { params }).then(r => r.data)
  }

  async consulta_api(params) {
    return await $http.get(`/clientes/consulta_api`, { params }).then(r => r.data)
  }

  async get_tipos(idEmpresa) {
    return await $http.get(`/clientes/tipos`, { params: { idEmpresa } }).then(r => r.data)
  }

  async crear(params) {
    return await $http.post(`/clientes`, params).then(r => r.data)
  }

  // async correo() {
  //   return await $http.get(`${api}/correo`).then(r => r.data)
  // }

  // async informacion(id) {
  //   return await $http.get(`${api}/informacion`, { params: { id } }).then(r => r.data)
  // }

  // async tipos_clientes_despachos({ base }) {
  //   return await $http.get(`${api}/tipos_clientes_despachos`, { params: { base } }).then(r => r.data)
  // }

  // // --> Prueba de exportacion de Excel
  // async excel() {
  //   return await $http
  //     .get(`/clientes/excel`, {
  //       responseType: 'blob'
  //     })
  //     .then(r => r.data)
  // }
}
