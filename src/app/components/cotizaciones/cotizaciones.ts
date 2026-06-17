import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { CotizacionService } from '../../services/cotizacion.service';
import { ClienteService } from '../../services/cliente.service';
import { ProductoService } from '../../services/producto.service';
import { Cotizacion } from '../../model/cotizacion.model';
import { Cliente } from '../../model/cliente.model';
import { Producto } from '../../model/producto.model';

@Component({
  selector: 'app-cotizaciones',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, RouterModule],
  templateUrl: './cotizaciones.html',
  styleUrls: ['./cotizaciones.css']
})
export class CotizacionesComponent implements OnInit {
  private fb = inject(FormBuilder);
  private cotizacionService = inject(CotizacionService);
  private clienteService = inject(ClienteService);
  private productoService = inject(ProductoService);

  cotizaciones: Cotizacion[] = [];
  clientes: Cliente[] = [];
  productos: Producto[] = [];
  isLoading = false;
  showForm = false;
  isEditing = false;
  selectedCotizacion: Cotizacion | null = null;

  stats = {
    total: 0,
    pendientes: 0,
    aprobadas: 0,
    rechazadas: 0
  };

  cotizacionForm = this.fb.group({
    idCliente: ['', [Validators.required]],
    lineas: this.fb.array([]),
    observaciones: ['']
  });

  ngOnInit(): void {
    this.loadData();
  }

  loadData(): void {
    this.isLoading = true;
    this.cotizacionService.getCotizaciones().subscribe({
      next: (data) => {
        this.cotizaciones = data;
        this.calculateStats();
        this.isLoading = false;
      },
      error: (error) => {
        console.error('Error al cargar cotizaciones:', error);
        this.isLoading = false;
        this.loadMockData();
      }
    });

    this.clienteService.getClientes().subscribe({
      next: (data) => this.clientes = data,
      error: () => this.loadMockClientes()
    });

    this.productoService.getProductosDisponibles().subscribe({
      next: (data) => this.productos = data,
      error: () => this.loadMockProductos()
    });
  }

  loadMockData(): void {
    this.cotizaciones = [
      {
        idCotizacion: 1,
        fecha: new Date(),
        cliente: { idCliente: 1, nombre: 'Construcciones SAC', tipoCliente: 'CORPORATIVO', descuentoAplicable: 10, ruc: '20123456789', direccion: 'Av. Principal 123', telefono: '987654321', email: 'info@construcciones.com', estado: 'ACTIVO' },
        lineasCotizacion: [
          { idLinea: 1, producto: { idProducto: 1, nombre: 'Perfil C-120', descripcion: 'Perfil estructural', precio: 450, stock: 50, stockMinimo: 10, unidadMedida: 'UNIDAD', categoria: 'PERFILES', estado: 'ACTIVO' }, cantidad: 10, precioUnitario: 450, descuento: 0, subtotal: 4500 }
        ],
        subtotal: 4500,
        descuento: 450,
        total: 4050,
        estado: 'PENDIENTE',
        observaciones: 'Cotización para proyecto de construcción',
        fechaVencimiento: new Date()
      }
    ];
    this.calculateStats();
  }

  loadMockClientes(): void {
    this.clientes = [
      { idCliente: 1, nombre: 'Construcciones SAC', tipoCliente: 'CORPORATIVO', descuentoAplicable: 10, ruc: '20123456789', direccion: 'Av. Principal 123', telefono: '987654321', email: 'info@construcciones.com', estado: 'ACTIVO' },
      { idCliente: 2, nombre: 'Metalurgica del Sur', tipoCliente: 'VIP', descuentoAplicable: 15, ruc: '20567890123', direccion: 'Calle 456', telefono: '987654322', email: 'info@metalurgica.com', estado: 'ACTIVO' }
    ];
  }

  loadMockProductos(): void {
    this.productos = [
      { idProducto: 1, nombre: 'Perfil C-120', descripcion: 'Perfil estructural', precio: 450, stock: 50, stockMinimo: 10, unidadMedida: 'UNIDAD', categoria: 'PERFILES', estado: 'ACTIVO' },
      { idProducto: 2, nombre: 'Acero A36', descripcion: 'Plancha de acero', precio: 1200, stock: 20, stockMinimo: 5, unidadMedida: 'PLANCHA', categoria: 'ACERO', estado: 'ACTIVO' }
    ];
  }

  calculateStats(): void {
    this.stats.total = this.cotizaciones.length;
    this.stats.pendientes = this.cotizaciones.filter(c => c.estado === 'PENDIENTE').length;
    this.stats.aprobadas = this.cotizaciones.filter(c => c.estado === 'APROBADA').length;
    this.stats.rechazadas = this.cotizaciones.filter(c => c.estado === 'RECHAZADA').length;
  }

  toggleForm(): void {
    this.showForm = !this.showForm;
    if (!this.showForm) {
      this.cotizacionForm.reset();
      this.isEditing = false;
      this.selectedCotizacion = null;
    }
  }

  editarCotizacion(cotizacion: Cotizacion): void {
    this.selectedCotizacion = cotizacion;
    this.isEditing = true;
    this.showForm = true;
    this.cotizacionForm.patchValue({
      idCliente: cotizacion.cliente.idCliente.toString(),
      observaciones: cotizacion.observaciones
    });
  }

  eliminarCotizacion(id: number): void {
    if (confirm('¿Está seguro de eliminar esta cotización?')) {
      this.cotizacionService.eliminarCotizacion(id).subscribe({
        next: () => {
          this.cotizaciones = this.cotizaciones.filter(c => c.idCotizacion !== id);
          this.calculateStats();
        },
        error: (error) => console.error('Error al eliminar:', error)
      });
    }
  }

  aprobarCotizacion(id: number): void {
    this.cotizacionService.aprobarCotizacion(id).subscribe({
      next: () => {
        const cotizacion = this.cotizaciones.find(c => c.idCotizacion === id);
        if (cotizacion) cotizacion.estado = 'APROBADA';
        this.calculateStats();
      },
      error: (error) => console.error('Error al aprobar:', error)
    });
  }

  onSubmit(): void {
    if (this.cotizacionForm.invalid) {
      this.cotizacionForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    const formData = this.cotizacionForm.value;

    console.log('Datos de cotización:', formData);

    setTimeout(() => {
      this.isLoading = false;
      this.toggleForm();
      this.loadData();
    }, 1000);
  }

  getEstadoBadge(estado: string): string {
    const badges: Record<string, string> = {
      'PENDIENTE': 'badge bg-warning text-dark',
      'APROBADA': 'badge bg-success',
      'RECHAZADA': 'badge bg-danger',
      'VENCIDA': 'badge bg-secondary'
    };
    return badges[estado] || 'badge bg-secondary';
  }

  getEstadoTexto(estado: string): string {
    const textos: Record<string, string> = {
      'PENDIENTE': 'Pendiente',
      'APROBADA': 'Aprobada',
      'RECHAZADA': 'Rechazada',
      'VENCIDA': 'Vencida'
    };
    return textos[estado] || estado;
  }

  getTipoClienteTexto(tipo: string): string {
    const textos: Record<string, string> = {
      'NORMAL': 'Normal',
      'VIP': 'VIP',
      'CORPORATIVO': 'Corporativo'
    };
    return textos[tipo] || tipo;
  }
}
