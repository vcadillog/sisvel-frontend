import { Cotizacion } from './cotizacion.model';

export interface Pedido {
  idPedido: number;
  cotizacion: Cotizacion;
  fechaPedido: Date;
  fechaEntrega: Date;
  estado: 'PENDIENTE' | 'CONFIRMADO' | 'DESPACHADO' | 'ENTREGADO' | 'CANCELADO';
  tipoComprobante: 'FACTURA' | 'BOLETA' | 'NOTA_CREDITO';
  montoTotal: number;
  observaciones: string;
  direccionEntrega: string;
}

export interface PedidoRequest {
  idCotizacion: number;
  fechaEntrega: Date;
  tipoComprobante: 'FACTURA' | 'BOLETA' | 'NOTA_CREDITO';
  direccionEntrega: string;
  observaciones: string;
}
