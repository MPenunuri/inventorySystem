import { Component } from '@angular/core';
import { AuthService } from '../../../../../services/security/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './menu.component.html',
  styleUrl: './menu.component.scss',
})
export class MenuComponent {
  imageUrl: string = 'assets/menu-outline.svg';
  showing: boolean = false;

  constructor(private service: AuthService, private router: Router) {}

  onClick() {
    this.showing = !this.showing;
  }

  logout() {
    this.service.logout();
    this.router.navigate(['/login']);
  }
}
