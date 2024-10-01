import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-small-edit-button',
  standalone: true,
  imports: [],
  templateUrl: './small-edit-button.component.html',
  styleUrl: './small-edit-button.component.scss',
})
export class SmallEditButtonComponent {
  @Input() spanText: string = '';
  @Input() editRoute?: string;

  constructor(private router: Router) {}

  handleClick() {
    if (this.editRoute) {
      this.router.navigate([this.editRoute]);
    }
  }
}
