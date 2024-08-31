import { $http } from '@/plugins'
// const base_comercial = 'JCHS2022'

const api = 'Tablas/Marcas'

export default class Marca {
  async listar(base_comercial, codigo = '') {
    // console.log(base_comercial)
    return await $http
      .get(`${api}`, { params: { base_comercial, codigo } })
      .then(r => r.data)
      .finally(() => {
        // $eventBus.$emit('overlay', false)
      })

    // return [
    //   { codigo: 'base', descripcion: base_comercial },
    //   { codigo: 'DUN', descripcion: 'DUNLOP' },
    //   { codigo: 'WEST', descripcion: 'WESTLAKE' },
    //   { codigo: 'ACCE', descripcion: 'ACCELERA' },
    //   { codigo: 'TRI', descripcion: 'TRIANGLE' }
    // ]
  }
}
