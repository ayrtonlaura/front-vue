import { $http } from '@/plugins'

const api = 'Tablas/Transportes'

export default class Usuario {
  async listar(base_comercial) {
    return await $http.get(`${api}/listar`, { params: { base_comercial } }).then(r => r.data)
  }

  async detalles(base_comercial, codigo) {
    return await $http.get(`${api}/detalles`, { params: { base_comercial, codigo } }).then(r => r.data)
  }
}
