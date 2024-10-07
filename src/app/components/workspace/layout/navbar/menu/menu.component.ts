import { Component } from '@angular/core';
import { AuthService } from '../../../../../services/security/auth/auth.service';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
@Component({
  selector: 'app-menu',
  standalone: true,
  imports: [CommonModule],
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

  navigate(url: string) {
    this.onClick();
    const outletContainer = document.getElementById('outletContainer');
    outletContainer?.classList.add('unstage');
    setTimeout(() => {
      this.router.navigate([url]);
      outletContainer?.classList.remove('unstage');
    }, 510);
  }

  logout() {
    this.onClick();
    this.service.logout();
    this.router.navigate(['/login']);
  }
}
