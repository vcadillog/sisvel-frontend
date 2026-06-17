import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { User } from '../../model/user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css']
})
export class DashboardComponent implements OnInit {
  private authService = inject(AuthService);

  currentUser: User | null = null;
  currentDate: Date = new Date();

  // Estadísticas del dashboard
  stats = {
    ventasHoy: 12,
    ventasMes: 156,
    ventasAnio: 1842,
    pedidosPendientes: 5,
    pedidosRechazados: 3,
    stockCritico: 8,
    stockTotal: 245,
    empleadosHoy: 42,
    empleadosTotal: 58,
    totalClientes: 2034,
    totalProveedores: 28
  };

  // Actividades recientes
  recentActivities = [
    {
      icon: 'cart-check',
      text: 'Pedido #1234 despachado a Construcciones SAC',
      time: 'Hace 5 min',
      color: 'success',
      user: 'Maria Lopez'
    },
    {
      icon: 'exclamation-triangle',
      text: 'Stock crítico: Perfil C-120 (solo 5 unidades)',
      time: 'Hace 15 min',
      color: 'warning',
      user: 'Sistema'
    },
    {
      icon: 'person-plus',
      text: 'Nuevo cliente registrado: Construcciones SAC',
      time: 'Hace 30 min',
      color: 'info',
      user: 'Carlos Perez'
    },
    {
      icon: 'receipt',
      text: 'Factura #F-2026-001 emitida por S/. 12,450.00',
      time: 'Hace 1 hora',
      color: 'primary',
      user: 'Ana Gomez'
    },
    {
      icon: 'truck',
      text: 'Adquisición: Acero A36 (200 unidades) en tránsito',
      time: 'Hace 2 horas',
      color: 'secondary',
      user: 'Jefe de Logística'
    }
  ];

  // Ventas por día (últimos 7 días)
  salesData = [
    { day: 'Lun', value: 8 },
    { day: 'Mar', value: 12 },
    { day: 'Mié', value: 15 },
    { day: 'Jue', value: 10 },
    { day: 'Vie', value: 18 },
    { day: 'Sáb', value: 6 },
    { day: 'Dom', value: 4 }
  ];

  // Accesos rápidos según rol
  quickActions: any[] = [];

  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    this.loadQuickActions();
    this.loadDashboardData();
  }

  loadQuickActions(): void {
    const role = this.currentUser?.rol;

    // Accesos rápidos según el rol del usuario
    const actions: Record<string, any[]> = {
      'ADMIN': [
        { label: 'Nueva Cotización', icon: 'file-earmark-text', route: '/ventas/cotizaciones', color: 'primary' },
        { label: 'Verificar Stock', icon: 'box', route: '/almacen/inventario', color: 'success' },
        { label: 'Despachar Pedido', icon: 'truck', route: '/almacen/despachos', color: 'warning' },
        { label: 'Marcar Asistencia', icon: 'clock', route: '/rrhh/asistencia', color: 'info' },
        { label: 'Generar Reporte', icon: 'bar-chart', route: '/admin/reportes', color: 'danger' }
      ],
      'VENTAS': [
        { label: 'Nueva Cotización', icon: 'file-earmark-text', route: '/ventas/cotizaciones', color: 'primary' },
        { label: 'Ver Pedidos', icon: 'cart', route: '/ventas/pedidos', color: 'success' },
        { label: 'Facturar', icon: 'receipt', route: '/ventas/facturacion', color: 'warning' }
      ],
      'ALMACEN': [
        { label: 'Verificar Stock', icon: 'box', route: '/almacen/inventario', color: 'primary' },
        { label: 'Despachar Pedido', icon: 'truck', route: '/almacen/despachos', color: 'success' },
        { label: 'Nueva Adquisición', icon: 'cart-plus', route: '/almacen/adquisiciones', color: 'warning' }
      ],
      'RRHH': [
        { label: 'Marcar Asistencia', icon: 'clock', route: '/rrhh/asistencia', color: 'primary' },
        { label: 'Ver Planilla', icon: 'cash-stack', route: '/rrhh/planilla', color: 'success' },
        { label: 'Gestionar Empleados', icon: 'people', route: '/rrhh/empleados', color: 'info' }
      ]
    };

    this.quickActions = actions[role || ''] || actions['ADMIN'];
  }

  loadDashboardData(): void {
    // Aquí se cargarían los datos reales desde un servicio
    // Por ahora usamos datos mock
    console.log('Dashboard cargado para:', this.currentUser);
  }

  getSaludo(): string {
    const hora = this.currentDate.getHours();
    if (hora < 12) return 'Buenos días';
    if (hora < 18) return 'Buenas tardes';
    return 'Buenas noches';
  }

  getNombreCompleto(): string {
    if (!this.currentUser) return '';
    return `${this.currentUser.nombre} ${this.currentUser.apellido}`;
  }

  logout(): void {
    this.authService.logout();
  }

  // Método para formatear números
  formatNumber(num: number): string {
    return num.toLocaleString('es-PE');
  }
}
