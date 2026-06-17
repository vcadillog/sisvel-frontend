import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { PedidoService } from '../../services/pedido.service';
import { Pedido } from '../../model/pedido.model';

@Component({
  selector: 'app-pedidos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './pedidos.html',
  styleUrls: ['./pedidos.css']
})
export class PedidosComponent implements OnInit {
  private fb = inject(FormBuilder);
  private pedidoService = inject(PedidoService);

  pedidos: Pedido[] = [];
  isLoading = false;
  showForm = false;
  isEditing = false;
  selectedPedido: Pedido | null = null;

  stats = {
    total: 0,
    pendientes: 0,
    despachados: 0,
    entregados: 0,
    cancelados: 0
  };

  pedidoForm = this.fb.group({
    idCotizacion: ['', [Validators.required]],
    fechaEntrega: ['', [Validators.required]],
    tipoComprobante: ['FACTURA', [Validators.required]],
    direccionEntrega: ['', [Validators.required]],
    observaciones: ['']
  });

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.pedidoService.getPedidos().subscribe({
      next: (data) => {
        this.pedidos = data;
        this.calculateStats();
        this.isLoading = false;
      },
      error: () => {
        this.loadMockData();
        this.isLoading = false;
      }
    });
  }

  loadMockData(): void {
    this.pedidos = [
      {
        idPedido: 1,
        cotizacion: {} as any,
        fechaPedido: new Date(),
        fechaEntrega: new Date(),
        estado: 'PENDIENTE',
        tipoComprobante: 'FACTURA',
        montoTotal: 4050,
        observaciones: 'Pedido urgente',
        direccionEntrega: 'Av. Principal 123'
      }
    ];
    this.calculateStats();
  }

  calculateStats(): void {
    this.stats.total = this.pedidos.length;
    this.stats.pendientes = this.pedidos.filter(p => p.estado === 'PENDIENTE').length;
    this.stats.despachados = this.pedidos.filter(p => p.estado === 'DESPACHADO').length;
    this.stats.entregados = this.pedidos.filter(p => p.estado === 'ENTREGADO').length;
    this.stats.cancelados = this.pedidos.filter(p => p.estado === 'CANCELADO').length;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.pedidoForm.reset();
      this.isEditing = false;
      this.selectedPedido = null;
    }
  }

  onSubmit(): void {
    if (this.pedidoForm.invalid) {
      this.pedidoForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    console.log('Datos de pedido:', this.pedidoForm.value);

    setTimeout(() => {
      this.isLoading = false;
      this.toggleForm();
      this.loadData();
    }, 1000);
  }

  cambiarEstado(id: number, estado: string): void {
    if (confirm(`¿Está seguro de cambiar el estado a ${estado}?`)) {
      this.pedidoService.cambiarEstadoPedido(id, estado).subscribe({
        next: () => {
          const pedido = this.pedidos.find(p => p.idPedido === id);
          if (pedido) pedido.estado = estado as any;
          this.calculateStats();
        },
        error: (error) => console.error('Error al cambiar estado:', error)
      });
    }
  }

  getEstadoBadge(estado: string): string {
    const badges: Record<string, string> = {
      'PENDIENTE': 'badge bg-warning text-dark',
      'CONFIRMADO': 'badge bg-info',
      'DESPACHADO': 'badge bg-primary',
      'ENTREGADO': 'badge bg-success',
      'CANCELADO': 'badge bg-danger'
    };
    return badges[estado] || 'badge bg-secondary';
  }

  getEstadoTexto(estado: string): string {
    const textos: Record<string, string> = {
      'PENDIENTE': 'Pendiente',
      'CONFIRMADO': 'Confirmado',
      'DESPACHADO': 'Despachado',
      'ENTREGADO': 'Entregado',
      'CANCELADO': 'Cancelado'
    };
    return textos[estado] || estado;
  }
}
