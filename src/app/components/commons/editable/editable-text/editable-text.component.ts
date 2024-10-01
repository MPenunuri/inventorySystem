import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-editable-text',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editable-text.component.html',
  styleUrl: './editable-text.component.scss',
})
export class EditableTextComponent {
  isEditing: boolean = false;
  text: string = 'Texto editable';

  toggleEdit(): void {
    this.isEditing = !this.isEditing;
    if (!this.isEditing) {
      this.saveChanges();
    }
  }

  saveChanges(): void {
    console.log('Guardando cambios: ', this.text);
  }
}
