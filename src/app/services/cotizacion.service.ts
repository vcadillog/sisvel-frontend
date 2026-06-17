import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Cotizacion, CotizacionRequest } from '../model/cotizacion.model';

@Injectable({
  providedIn: 'root'
})
export class CotizacionService {
  private http = inject(HttpClient);

  getCotizaciones(): Observable<Cotizacion[]> {
    return this.http.get<Cotizacion[]>(`${environment.url}/cotizaciones`);
  }

  getCotizacionesByCliente(idCliente: number): Observable<Cotizacion[]> {
    return this.http.get<Cotizacion[]>(`${environment.url}/cotizaciones/cliente/${idCliente}`);
  }

  getCotizacionById(id: number): Observable<Cotizacion> {
    return this.http.get<Cotizacion>(`${environment.url}/cotizaciones/${id}`);
  }

  registrarCotizacion(cotizacion: CotizacionRequest): Observable<Cotizacion> {
    return this.http.post<Cotizacion>(`${environment.url}/cotizaciones`, cotizacion);
  }

  actualizarCotizacion(id: number, cotizacion: CotizacionRequest): Observable<Cotizacion> {
    return this.http.put<Cotizacion>(`${environment.url}/cotizaciones/${id}`, cotizacion);
  }

  aprobarCotizacion(id: number): Observable<Cotizacion> {
    return this.http.put<Cotizacion>(`${environment.url}/cotizaciones/${id}/aprobar`, {});
  }

  rechazarCotizacion(id: number, motivo: string): Observable<Cotizacion> {
    return this.http.put<Cotizacion>(`${environment.url}/cotizaciones/${id}/rechazar`, { motivo });
  }

  eliminarCotizacion(id: number): Observable<void> {
    return this.http.delete<void>(`${environment.url}/cotizaciones/${id}`);
  }
}
