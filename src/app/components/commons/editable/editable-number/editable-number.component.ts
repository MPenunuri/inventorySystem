import { CommonModule } from '@angular/common';
import { Component, Input, SimpleChanges } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-editable-number',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './editable-number.component.html',
  styleUrl: './editable-number.component.scss',
})
export class EditableNumberComponent {
  @Input() decimals: number = 0;
  editable: boolean = false;
  isEditing: boolean = false;
  @Input() id?: number;
  @Input() text: string = '';
  private prev: string = '';
  @Input() action?: (id: number, number: number) => Observable<any>;

  ngOnChanges(changes: SimpleChanges): void {
    if ('text' in changes) {
      this.prev = this.text;
      this.text = this.formatNumber(this.text);
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

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;

    if (this.decimals === 0) {
      value = value.replace(/\D/g, '');
    } else if (this.decimals > 0) {
      value = value.replace(/[^0-9.]/g, '');
      const decimalIndex = value.indexOf('.');
      if (decimalIndex >= 0) {
        value =
          value.slice(0, decimalIndex + 1) +
          value.slice(decimalIndex + 1).replace(/\./g, '');
        const decimalPart = value.split('.')[1];
        if (decimalPart?.length > this.decimals) {
          value = value.slice(0, decimalIndex + 1 + this.decimals);
        }
      }
    }

    this.text = this.formatNumber(value);
    inputElement.value = this.text;
  }

  formatNumber(value: string): string {
    const numberValue = parseFloat(value.replace(/,/g, ''));
    if (!isNaN(numberValue)) {
      return numberValue.toLocaleString('en-US', {
        minimumFractionDigits: this.decimals,
        maximumFractionDigits: this.decimals,
      });
    }
    return '';
  }

  saveChanges(): void {
    if (this.id && this.action) {
      this.action(this.id, parseFloat(this.text.replace(/,/g, ''))).subscribe({
        next: (response) => {},
        error: (err) => {
          this.text = this.prev;
          alert('An error occurred during saving the text');
        },
      });
    }
  }
}
