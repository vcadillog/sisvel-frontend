import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Pedido, PedidoRequest } from '../model/pedido.model';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private http = inject(HttpClient);

  getPedidos(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${environment.url}/pedidos`);
  }

  getPedidosPendientes(): Observable<Pedido[]> {
    return this.http.get<Pedido[]>(`${environment.url}/pedidos/pendientes`);
  }

  getPedidoById(id: number): Observable<Pedido> {
    return this.http.get<Pedido>(`${environment.url}/pedidos/${id}`);
  }

  registrarPedido(pedido: PedidoRequest): Observable<Pedido> {
    return this.http.post<Pedido>(`${environment.url}/pedidos`, pedido);
  }

  actualizarPedido(id: number, pedido: PedidoRequest): Observable<Pedido> {
    return this.http.put<Pedido>(`${environment.url}/pedidos/${id}`, pedido);
  }

  cambiarEstadoPedido(id: number, estado: string): Observable<Pedido> {
    return this.http.put<Pedido>(`${environment.url}/pedidos/${id}/estado`, { estado });
  }

  cancelarPedido(id: number, motivo: string): Observable<Pedido> {
    return this.http.put<Pedido>(`${environment.url}/pedidos/${id}/cancelar`, { motivo });
  }

  eliminarPedido(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url}/pedidos/${id}`);
  }
}
