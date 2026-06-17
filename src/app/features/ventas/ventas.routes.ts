import { Routes } from '@angular/router';

export const ventasRoutes: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('../../components/ventas/ventas')
        .then(m => m.VentasComponent)
  },
  {
    path: 'cotizaciones',
    loadComponent: () =>
      import('../../components/cotizaciones/cotizaciones')
        .then(m => m.CotizacionesComponent)
  },
  {
    path: 'pedidos',
    loadComponent: () =>
      import('../../components/pedidos/pedidos')
        .then(m => m.PedidosComponent)
  },
  {
    path: 'facturacion',
    loadComponent: () =>
      import('../../components/facturacion/facturacion')
        .then(m => m.FacturacionComponent)
  }
];
