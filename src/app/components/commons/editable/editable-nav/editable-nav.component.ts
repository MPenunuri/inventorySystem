import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-editable-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './editable-nav.component.html',
  styleUrl: './editable-nav.component.scss',
})
export class EditableNavComponent {
  showingLink = false;
  @Input() text?: string;
  @Input() editRoute!: string;
  @Input() spanText: string = '';

  constructor(private router: Router) {}

  ngOnInit() {
    this.showingLink = !!this.text;
  }

  handleClick() {
    if (this.editRoute) {
      this.router.navigate([this.editRoute]);
    }
  }
}
