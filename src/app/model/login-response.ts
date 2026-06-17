export interface LoginResponse {
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: 'ADMIN' | 'VENTAS' | 'ALMACEN' | 'RRHH';
  token: string;
}
