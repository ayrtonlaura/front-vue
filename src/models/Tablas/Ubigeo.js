import { $http } from '@/plugins'

export default class Ubigeo {
  async distritos(params) {
    return await $http.get(`ubigeo/distritos`, { params }).then(r => r.data)
  }
}
