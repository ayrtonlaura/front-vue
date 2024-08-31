import { $http } from '@/plugins'
const api = 'Stock_rapido'

export default class Stock {
  async buscar(params) {
    return await $http.post(`${api}/stock`, params).then(r => r.data)
  }

  async stock_nacional(params) {
    // return await $http.post(`${api}/dialogo_stock`, params).then(r => r.data)
    return await $http.get(`productos/stock`, { params }).then(r => r.data)
  }
}
