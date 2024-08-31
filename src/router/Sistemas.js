export default [
  {
    name: 'sistemas_inicio',
    path: '/:hash/sistemas',
    component: () => import('@/views/Sistemas')
  },

  // -> Soporte
  {
    name: 'sistemas-soporte-varios',
    path: '/:hash/sistemas/soporte/varios',
    component: () => import('@/views/Sistemas/Soporte/Varios')
  },

  // -> Mantenimientos
  {
    name: 'sistemas-mantenimientos-usuarios',
    path: '/:hash/sistemas/mantenimientos/usuarios',
    component: () => import('@/views/Sistemas/Mantenimientos/Usuarios')
  },
  {
    name: 'sistemas-mantenimientos-empresas',
    path: '/:hash/sistemas/mantenimientos/Empresas',
    component: () => import('@/views/Sistemas/Mantenimientos/Empresas')
  },
  {
    name: 'sistemas-mantenimientos-agencias',
    path: '/:hash/sistemas/mantenimientos/Agencias',
    component: () => import('@/views/Sistemas/Mantenimientos/Agencias')
  },
  {
    name: 'sistemas-mantenimientos-modulos-pedidos-pos',
    path: '/:hash/sistemas/mantenimientos/modulos/pedidos_pos',
    component: () => import('@/views/Sistemas/Mantenimientos/Modulos/PedidosPOS')
  },

  // -> Inventarios
  {
    name: 'sistemas-inventarios-equipos',
    path: '/:hash/sistemas/inventarios/equipos',
    component: () => import('@/views/Sistemas/Inventarios/Equipos')
  }
]
