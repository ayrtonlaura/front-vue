export default [
  {
    name: 'atencion_cliente_inicio',
    path: '/:hash/atencion_clientes',
    // meta: { title: 'Inicio' },
    component: () => import('@/views/Atencion_clientes/index.vue')
  },

  // -> Tablas
  {
    path: '/:hash/atencion_clientes/tablas/agencias_transportes',
    name: 'atencion-clientes-reportes-agencias-transportes',
    // meta: { title: 'Agencia de Transporte' },
    component: () => import('@/views/Atencion_clientes/Tablas/Agencia_transportes')
  },

  // -> Ventas
  {
    path: '/:hash/atencion_clientes/ventas/carrito',
    name: 'atencion-clientes-ventas-carrito',
    // meta: { title: 'Carrito de Ventas' },
    component: () => import('@/views/Atencion_clientes/Ventas/Carrito')
  },
  {
    path: '/:hash/atencion_clientes/ventas/carrito-pos',
    name: 'atencion-clientes-ventas-carrito-pos',
    // meta: { title: 'Carrito de Ventas POS' },
    component: () => import('@/views/Atencion_clientes/Ventas/CarritoPOS')
  },
  {
    path: '/:hash/atencion_clientes/ventas/pedidos',
    name: 'atencion-clientes-ventas-pedidos',
    // meta: { title: 'Carrito de Ventas' },
    component: () => import('@/views/Atencion_clientes/Ventas/Pedidos')
  },

  // -> Reportes
  {
    path: '/:hash/atencion_clientes/ventas/reportes/ventas_por_cliente',
    name: 'atencion-reportes-ventas-por-cliente',
    component: () => import('@/views/Atencion_clientes/Reportes/Ventas_por_cliente')
  },
  {
    path: '/:hash/atencion_clientes/ventas/reportes/separaciones_stock',
    name: 'atencion-clientes-reportes-separaciones-stock',
    component: () => import('@/views/Atencion_clientes/Reportes/Separaciones_stock')
  },
  {
    path: '/:hash/atencion_clientes/ventas/reportes/guias_despacho',
    name: 'atencion-clientes-reportes-guias-despacho',
    component: () => import('@/views/Atencion_clientes/Reportes/Guias_despachos')
  },

  // -> Despachos
  {
    name: 'atencion-clientes-despachos-ordenes',
    path: '/:hash/atencion_clientes/despachos/ordenes',
    component: () => import('@/views/Atencion_clientes/Despachos/ordenes')
  },
  {
    name: 'atencion-clientes-despachos-ruta-asignada',
    path: '/:hash/atencion_clientes/Despachos/rutaAsignada',
    component: () => import('@/views/Atencion_clientes/Despachos/ruta_asignada')
  },
  {
    name: 'atencion-clientes-despacho-ruta-orden',
    path: '/:hash/atencion_clientes/Despachos/rutaAsignada/Orden/:id',
    component: () => import('@/views/Atencion_clientes/Despachos/ruta_asignada/Orden')
  },
  {
    name: 'atencion-clientes-despacho-ruta-guias',
    path: '/:hash/atencion_clientes/Despachos/rutaAsignada/Guias',
    component: () => import('@/views/Atencion_clientes/Despachos/ruta_asignada/Guias')
  },
  {
    name: 'atencion-clientes-despacho-ruta-formulario',
    path: '/:hash/atencion_clientes/Despachos/rutaAsignada/Formulario',
    component: () => import('@/views/Atencion_clientes/Despachos/ruta_asignada/Formulario')
  },

  // -> Utilitarios
  {
    name: 'atencion-clientes-utilitarios-isos',
    path: '/:hash/atencion_clientes/utilitarios/isos',
    component: () => import('@/views/Atencion_clientes/Utilitarios/ISOs')
  }

  // {
  //   name: 'ventas_despachos_administracion_choferes',
  //   path: '/:hash/atencion_clientes/Despachos/AdmChoferes',
  //   // meta: { title: 'ventas_despachos_administracion_choferes' },
  //   component: () => import('@/views/Atencion_clientes/Despachos/administrarChoferes.vue')
  // },
  // {
  //   name: 'ventas_despachos_georeferencia_vendedor',
  //   path: '/atencion_clientes/Despachos/GeoVendedor',
  //   // meta: { title: 'ventas_despachos_georeferencia_vendedor' },
  //   component: () => import('@/views/Atencion_clientes/Despachos/georeferenciaVendedor.vue')
  // },
  // {
  //   name: 'ventas_despachos_borrador_clientes',
  //   path: '/atencion_clientes/Despachos/BorradorCliente',
  //   // meta: { title: 'ventas_despachos_borrador_clientes' },
  //   component: () => import('@/views/Atencion_clientes/Despachos/borradorClientes.vue')
  // }
]
