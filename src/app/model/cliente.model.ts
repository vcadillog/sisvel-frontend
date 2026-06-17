export interface Cliente {
  idCliente: number;
  nombre: string;
  tipoCliente: 'NORMAL' | 'VIP' | 'CORPORATIVO';
  descuentoAplicable: number;
  ruc: string;
  direccion: string;
  telefono: string;
  email: string;
  estado: 'ACTIVO' | 'INACTIVO';
}

export interface ClienteRequest {
  nombre: string;
  tipoCliente: 'NORMAL' | 'VIP' | 'CORPORATIVO';
  ruc: string;
  direccion: string;
  telefono: string;
  email: string;
}

export interface ClienteResponse extends Cliente {
  idCliente: number;
}
