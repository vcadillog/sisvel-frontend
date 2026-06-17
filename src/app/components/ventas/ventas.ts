import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-ventas',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './ventas.html',
  styleUrls: ['./ventas.css']
})
export class VentasComponent implements OnInit {
  private authService = inject(AuthService);

  stats = {
    cotizaciones: 12,
    pedidos: 8,
    facturas: 15,
    totalVentas: 45280.50
  };

  ngOnInit(): void {
    // Cargar datos reales desde servicios
    console.log('Panel de Ventas cargado');
    this.loadStats();
  }

  loadStats(): void {
    // Aquí se cargarían los datos reales desde el servicio
    // Por ahora usamos datos mock
    // this.cotizacionService.getCotizaciones().subscribe(...)
  }

  getNombreUsuario(): string {
    const user = this.authService.getCurrentUser();
    return user ? `${user.nombre} ${user.apellido}` : 'Usuario';
  }

  formatMoneda(valor: number): string {
    return valor.toLocaleString('es-PE', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    });
  }
}
