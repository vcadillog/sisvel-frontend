import { Routes } from '@angular/router';

export const ventasRoutes: Routes = [
  // Ruta por defecto: /ventas → muestra el Panel de Ventas
  {
    path: '',
    loadComponent: () =>
      import('../../components/ventas/ventas')
        .then(m => m.VentasComponent)
  },
  // /ventas/cotizaciones
  {
    path: 'cotizaciones',
    loadComponent: () =>
      import('../../components/cotizaciones/cotizaciones')
        .then(m => m.CotizacionesComponent)
  },
  // /ventas/pedidos
  {
    path: 'pedidos',
    loadComponent: () =>
      import('../../components/pedidos/pedidos')
        .then(m => m.PedidosComponent)
  },
  // /ventas/facturacion
  {
    path: 'facturacion',
    loadComponent: () =>
      import('../../components/facturacion/facturacion')
        .then(m => m.FacturacionComponent)
  }
];
