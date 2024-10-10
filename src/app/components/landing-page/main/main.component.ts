import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  constructor(private router: Router) {}
  handleClick() {
    const container = document.querySelector('.landingPage');
    container?.classList.add('unstage');
    setTimeout(() => {
      this.router.navigate(['/signup']);
    }, 510);
  }
}
