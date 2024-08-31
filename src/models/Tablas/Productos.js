import { $http } from '@/plugins'

export default class Producto {
  async pedidos_pos_buscar(params) {
    return await $http.get(`productos`, { params }).then(r => r.data)
  }
}
