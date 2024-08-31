import { $http } from '@/plugins'

const api = 'despachos/guias'

export default class Guias {
  async buscar(params) {
    return await $http.get(`${api}`, { params }).then(r => r.data)
  }
}
