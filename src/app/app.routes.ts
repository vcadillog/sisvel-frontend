import { Routes } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'auth/login',
    pathMatch: 'full'
  },
  {
    path: 'auth',
    loadChildren: () =>
      import('./features/auth/auth.routes')
        .then(m => m.authRoutes)
  },
  {
    path: '',
    component: NavbarComponent,
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./components/dashboard/dashboard')
            .then(m => m.DashboardComponent)
      },
      {
        path: 'ventas',
        loadChildren: () =>
          import('./features/ventas/ventas.routes')
            .then(m => m.ventasRoutes)
      },
      // {
      //   path: 'almacen',
      //   loadChildren: () =>
      //     import('./features/almacen/almacen.routes')
      //       .then(m => m.almacenRoutes)
      // },
      // {
      //   path: 'rrhh',
      //   loadChildren: () =>
      //     import('./features/rrhh/rrhh.routes')
      //       .then(m => m.rrhhRoutes)
      // },
      // {
      //   path: 'admin',
      //   loadChildren: () =>
      //     import('./features/admin/admin.routes')
      //       .then(m => m.adminRoutes)
      // }
    ]
  },
];
