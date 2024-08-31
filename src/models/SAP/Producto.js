import { $http } from '@/plugins'
// import { $http } from '@/plugins/provides'
const api = 'sap'

export default class SAP_Producto {
  // constructor() {
  //   this.orden = null
  // }

  async listar(params) {
    return await $http.get(`${api}/odbc_productos`, { params }).then(r => r.data)
  }

  async editar(params) {
    return await $http.post(`${api}/productos/modificar`, params).then(r => r.data)
  }

  async crear(params) {
    return await $http.post(`${api}/productos/crear`, params).then(r => r.data)
  }
}
