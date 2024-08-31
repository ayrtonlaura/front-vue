import { $http } from '@/plugins'

export default class Tablas {
  async paises(params) {
    return await $http.get(`/tablas/paises`, { params }).then(r => r.data)
  }
}
