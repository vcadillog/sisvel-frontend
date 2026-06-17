import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { LoginRequest } from '../model/login-request';
import { LoginResponse } from '../model/login-response';
import { User, UserRole } from '../model/user.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);

  private readonly TOKEN_KEY = 'sisvel_token';
  private readonly USER_KEY = 'sisvel_user';

  private currentUserSubject = new BehaviorSubject<User | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor() {
    this.loadStoredUser();
  }

  private loadStoredUser(): void {
    const storedUser = localStorage.getItem(this.USER_KEY);
    if (storedUser) {
      try {
        const user: User = JSON.parse(storedUser);
        this.currentUserSubject.next(user);
      } catch (e) {
        this.logout();
      }
    }
  }

  login(credentials: LoginRequest): Observable<LoginResponse> {
    // MOCK para desarrollo
    const mockUsers: LoginResponse[] = [
      { id: 1, username: 'admin', nombre: 'Admin', apellido: 'Sistema', email: 'admin@sisvel.com', rol: 'ADMIN', token: 'mock-token-admin' },
      { id: 2, username: 'ventas', nombre: 'Carlos', apellido: 'Perez', email: 'ventas@sisvel.com', rol: 'VENTAS', token: 'mock-token-ventas' },
      { id: 3, username: 'almacen', nombre: 'Maria', apellido: 'Lopez', email: 'almacen@sisvel.com', rol: 'ALMACEN', token: 'mock-token-almacen' },
      { id: 4, username: 'rrhh', nombre: 'Ana', apellido: 'Gomez', email: 'rrhh@sisvel.com', rol: 'RRHH', token: 'mock-token-rrhh' }
    ];

    const user = mockUsers.find(u => u.username === credentials.username && credentials.password === '123456');

    if (!user) {
      return throwError(() => new Error('Credenciales incorrectas'));
    }

    return new Observable<LoginResponse>(observer => {
      setTimeout(() => {
        this.setSession(user);
        const userData: User = {
          id: user.id,
          username: user.username,
          nombre: user.nombre,
          apellido: user.apellido,
          email: user.email,
          rol: user.rol,
          token: user.token
        };
        this.currentUserSubject.next(userData);
        observer.next(user);
        observer.complete();
      }, 800);
    });
  }

  private setSession(response: LoginResponse): void {
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.USER_KEY, JSON.stringify({
      id: response.id,
      username: response.username,
      nombre: response.nombre,
      apellido: response.apellido,
      email: response.email,
      rol: response.rol
    }));
  }

  logout(): void {
    localStorage.removeItem(this.TOKEN_KEY);
    localStorage.removeItem(this.USER_KEY);
    this.currentUserSubject.next(null);
    this.router.navigate(['/auth/login']);
  }

  getToken(): string | null {
    return localStorage.getItem(this.TOKEN_KEY);
  }

  getCurrentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  hasRole(roles: UserRole | UserRole[]): boolean {
    const user = this.getCurrentUser();
    if (!user) return false;

    if (Array.isArray(roles)) {
      return roles.includes(user.rol);
    }
    return user.rol === roles;
  }

  getDefaultRouteByRole(rol: UserRole): string {
    const routes: Record<UserRole, string> = {
      'ADMIN': '/dashboard',
      'VENTAS': '/ventas/cotizaciones',
      'ALMACEN': '/almacen/inventario',
      'RRHH': '/rrhh/asistencia'
    };
    return routes[rol] || '/dashboard';
  }
}
