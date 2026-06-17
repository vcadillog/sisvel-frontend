import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-facturacion',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './facturacion.html',
  styleUrls: ['./facturacion.css']
})
export class FacturacionComponent {
  facturas = [
    { id: 1, numero: 'F001-001', cliente: 'Construcciones SAC', fecha: new Date(), monto: 4050, estado: 'EMITIDA' },
    { id: 2, numero: 'F001-002', cliente: 'Metalurgica del Sur', fecha: new Date(), monto: 12000, estado: 'PAGADA' },
    { id: 3, numero: 'F001-003', cliente: 'Constructora ABC', fecha: new Date(), monto: 7800, estado: 'VENCIDA' }
  ];

  getEstadoBadge(estado: string): string {
    const badges: Record<string, string> = {
      'EMITIDA': 'badge bg-primary',
      'PAGADA': 'badge bg-success',
      'VENCIDA': 'badge bg-danger',
      'ANULADA': 'badge bg-secondary'
    };
    return badges[estado] || 'badge bg-secondary';
  }

  getEstadoTexto(estado: string): string {
    const textos: Record<string, string> = {
      'EMITIDA': 'Emitida',
      'PAGADA': 'Pagada',
      'VENCIDA': 'Vencida',
      'ANULADA': 'Anulada'
    };
    return textos[estado] || estado;
  }
}
