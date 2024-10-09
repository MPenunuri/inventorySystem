import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-small-nav-button',
  standalone: true,
  imports: [],
  templateUrl: './small-nav-button.component.html',
  styleUrl: './small-nav-button.component.scss',
})
export class SmallNavButtonComponent {
  @Input() spanText: string = '';
  @Input() editRoute?: string;

  constructor(private router: Router) {}

  handleClick() {
    if (this.editRoute) {
      this.router.navigate([this.editRoute]);
    }
  }
}
