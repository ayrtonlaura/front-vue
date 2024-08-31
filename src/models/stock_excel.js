import { $http } from '@/plugins'

const api = 'Stock_rapido_excel'

export default class Stock_excel {
  async excel(params) {
    return await $http.post(`${api}`, params, { responseType: 'blob' }).then(r => r.data)
  }
}
