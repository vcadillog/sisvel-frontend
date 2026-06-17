export interface Producto {
  idProducto: number;
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  stockMinimo: number;
  unidadMedida: string;
  categoria: string;
  estado: 'ACTIVO' | 'INACTIVO';
}

export interface ProductoRequest {
  nombre: string;
  descripcion: string;
  precio: number;
  stock: number;
  stockMinimo: number;
  unidadMedida: string;
  categoria: string;
}
