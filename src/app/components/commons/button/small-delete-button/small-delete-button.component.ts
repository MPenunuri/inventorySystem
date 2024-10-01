import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-small-delete-button',
  standalone: true,
  imports: [],
  templateUrl: './small-delete-button.component.html',
  styleUrl: './small-delete-button.component.scss',
})
export class SmallDeleteButtonComponent {
  @Input() spanText: string = '';
  @Input() id?: number;
  @Input() deleteFn?: (id: number) => Observable<void>;
  @Output() clicked: EventEmitter<void> = new EventEmitter();

  handleClick() {
    if (this.id !== undefined && this.deleteFn !== undefined) {
      this.deleteFn(this.id).subscribe({
        next: (reponse) => {
          this.clicked.emit();
        },
        error: (err) => {
          alert('An error occurred during the deletion process');
        },
      });
    }
  }
}
