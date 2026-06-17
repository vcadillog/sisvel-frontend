import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cliente, ClienteRequest, ClienteResponse } from '../model/cliente.model';

@Injectable({
  providedIn: 'root'
})
export class ClienteService {
  private http = inject(HttpClient);

  getClientes(): Observable<ClienteResponse[]> {
    return this.http.get<ClienteResponse[]>(`${environment.url}/clientes`);
  }

  getClienteById(id: number): Observable<ClienteResponse> {
    return this.http.get<ClienteResponse>(`${environment.url}/clientes/${id}`);
  }

  registrarCliente(cliente: ClienteRequest): Observable<ClienteResponse> {
    return this.http.post<ClienteResponse>(`${environment.url}/clientes`, cliente);
  }

  actualizarCliente(id: number, cliente: ClienteRequest): Observable<ClienteResponse> {
    return this.http.put<ClienteResponse>(`${environment.url}/clientes/${id}`, cliente);
  }

  eliminarCliente(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url}/clientes/${id}`);
  }
}
