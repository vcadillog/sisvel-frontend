import { Cliente } from './cliente.model';
import { Producto } from './producto.model';

export interface Cotizacion {
  idCotizacion: number;
  fecha: Date;
  cliente: Cliente;
  lineasCotizacion: LineaCotizacion[];
  subtotal: number;
  descuento: number;
  total: number;
  estado: 'PENDIENTE' | 'APROBADA' | 'RECHAZADA' | 'VENCIDA';
  observaciones: string;
  fechaVencimiento: Date;
}

export interface LineaCotizacion {
  idLinea: number;
  producto: Producto;
  cantidad: number;
  precioUnitario: number;
  descuento: number;
  subtotal: number;
}

export interface CotizacionRequest {
  idCliente: number;
  lineas: LineaCotizacionRequest[];
  observaciones: string;
}

export interface LineaCotizacionRequest {
  idProducto: number;
  cantidad: number;
  descuento: number;
}
