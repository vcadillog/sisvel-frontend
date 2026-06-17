import { Pedido } from './pedido.model';

export interface Factura {
  idComprobante: number;
  tipo: 'FACTURA' | 'BOLETA' | 'NOTA_CREDITO';
  pedido: Pedido;
  monto: number;
  igv: number;
  total: number;
  fechaEmision: Date;
  fechaVencimiento: Date;
  estado: 'EMITIDA' | 'PAGADA' | 'VENCIDA' | 'ANULADA';
  numeroSerie: string;
  numeroCorrelativo: string;
  rucCliente: string;
  razonSocial: string;
  direccion: string;
}
