import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Producto, ProductoRequest } from '../model/producto.model';

@Injectable({
  providedIn: 'root'
})
export class ProductoService {
  private http = inject(HttpClient);

  getProductos(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${environment.url}/productos`);
  }

  getProductosDisponibles(): Observable<Producto[]> {
    return this.http.get<Producto[]>(`${environment.url}/productos/disponibles`);
  }

  getProductoById(id: number): Observable<Producto> {
    return this.http.get<Producto>(`${environment.url}/productos/${id}`);
  }

  registrarProducto(producto: ProductoRequest): Observable<Producto> {
    return this.http.post<Producto>(`${environment.url}/productos`, producto);
  }

  actualizarProducto(id: number, producto: ProductoRequest): Observable<Producto> {
    return this.http.put<Producto>(`${environment.url}/productos/${id}`, producto);
  }

  eliminarProducto(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url}/productos/${id}`);
  }

  verificarStock(idProducto: number, cantidad: number): Observable<{disponible: boolean, stock: number}> {
    return this.http.get<{disponible: boolean, stock: number}>(`${environment.url}/productos/${idProducto}/stock/${cantidad}`);
  }
}
