import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editable-text',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editable-text.component.html',
  styleUrl: './editable-text.component.scss',
})
export class EditableTextComponent {
  editable: boolean = false;
  isEditing: boolean = false;
  @Input() id?: number;
  @Input() text: string = '';
  private prev: string = '';
  @Input() action?: (id: number, text: string) => Observable<any>;

  ngOnChanges(changes: SimpleChanges): void {
    if ('text' in changes && this.prev === '') {
      this.prev = this.text;
    }
    if (this.id && this.action) {
      this.editable = true;
    } else {
      this.editable = false;
    }
  }

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.saveChanges();
    }
  }

  saveChanges(): void {
    if (this.id && this.action) {
      this.action(this.id, this.text).subscribe({
        next: (response) => {},
        error: (err) => {
          this.text = this.prev;
          alert('An error occurred during saving the text');
        },
      });
    }
  }
}
