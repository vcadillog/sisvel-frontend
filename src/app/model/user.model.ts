export type UserRole = 'ADMIN' | 'VENTAS' | 'ALMACEN' | 'RRHH';

export interface User {
  id: number;
  username: string;
  nombre: string;
  apellido: string;
  email: string;
  rol: UserRole;
  token?: string;
}
