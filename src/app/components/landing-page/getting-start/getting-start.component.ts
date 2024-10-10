import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-getting-start',
  standalone: true,
  imports: [],
  templateUrl: './getting-start.component.html',
  styleUrl: './getting-start.component.scss',
})
export class GettingStartComponent {
  constructor(private router: Router) {}
  singup() {
    const container = document.querySelector('.landingPage');
    container?.classList.add('unstage');
    setTimeout(() => {
      this.router.navigate(['/signup']);
    }, 510);
  }
  login() {
    const container = document.querySelector('.landingPage');
    container?.classList.add('unstage');
    setTimeout(() => {
      this.router.navigate(['/login']);
    }, 510);
  }
}
