import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './navbar.html',
  styleUrls: ['./navbar.css']
})
export class NavbarComponent {
  private authService = inject(AuthService);

  get currentUser() {
    return this.authService.getCurrentUser();
  }

  get nombreCompleto(): string {
    const user = this.currentUser;
    return user ? `${user.nombre} ${user.apellido}` : 'Usuario';
  }

  get rol(): string {
    const user = this.currentUser;
    return user ? user.rol : '';
  }

  logout(): void {
    this.authService.logout();
  }
}
