export default [
  {
    name: 'comex_inicio',
    path: '/:hash/comex',
    component: () => import('@/views/Comex')
  },

  // -> Reportes
  {
    name: 'comex-reportes-tracking',
    path: '/:hash/Comex/Reportes/Tracking',
    component: () => import('@/views/Comex/Reportes')
  },

  // -> Tracking
  {
    name: 'comex-tracking-listado-pedidos',
    path: '/:hash/Comex/Tracking/Listado',
    component: () => import('@/views/Comex/Tracking/listado')
  },
  {
    name: 'comex-tracking-pedido',
    path: '/:hash/Comex/Tracking/Pedido',
    component: () => import('@/views/Comex/Tracking/pedido')
  },
  {
    name: 'comex-tracking-proforma',
    path: '/:hash/Comex/Tracking/Proforma',
    component: () => import('@/views/Comex/Tracking/proforma')
  },
  {
    name: 'comex-tracking-invoice',
    path: '/:hash/Comex/Tracking/Invoice',
    component: () => import('@/views/Comex/Tracking/invoice')
  },
  {
    name: 'comex-tracking-contenedores',
    path: '/:hash/Comex/Tracking/Contenedor',
    component: () => import('@/views/Comex/Tracking/contenedor')
  },
  {
    name: 'comex-tracking-parte-entrada',
    path: '/:hash/Comex/Tracking/parte-entrada',
    component: () => import('@/views/Comex/Tracking/parte-entrada')
  }
]
