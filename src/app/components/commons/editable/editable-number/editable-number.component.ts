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
  @Input() id2?: number;
  @Input() text: string = '';
  private prev: string = '';
  @Input() action?: (id: number, number: number) => Observable<any>;
  @Input() action2?: (
    id: number,
    id2: number,
    number: number
  ) => Observable<boolean>;

  ngOnChanges(changes: SimpleChanges): void {
    if ('text' in changes) {
      this.prev = this.text;
      this.text = this.formatNumber(this.text);
    }
    if (this.id && this.action) {
      this.editable = true;
    } else if (this.id && this.id2 && this.action2) {
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

    // Save original cursor position and count commas before formatting
    const selectionStart = inputElement.selectionStart || 0;
    const originalCommasBeforeCursor = this.countCommas(value, selectionStart);

    // Remove non-numeric characters except decimal point
    value = value.replace(/[^0-9.]/g, '');

    // Apply formatting
    const formattedValue = this.formatNumber(value);

    // Store the formatted value
    this.text = formattedValue;
    inputElement.value = formattedValue;

    // Count commas after formatting
    const newCommasBeforeCursor = this.countCommas(
      formattedValue,
      selectionStart
    );

    // Calculate necessary cursor adjustment
    let cursorPositionAdjustment =
      newCommasBeforeCursor - originalCommasBeforeCursor;

    // If the cursor is after the decimal point, no adjustment for commas
    const decimalIndex = formattedValue.indexOf('.');
    if (decimalIndex !== -1 && selectionStart > decimalIndex) {
      cursorPositionAdjustment = 0;
    }

    // Calculate new cursor position
    const newCursorPosition = selectionStart + cursorPositionAdjustment;

    // Move cursor to the correct position
    setTimeout(() => {
      inputElement.setSelectionRange(newCursorPosition, newCursorPosition);
    }, 0);
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

  countCommas(value: string, limit: number): number {
    return (value.slice(0, limit).match(/,/g) || []).length;
  }

  saveChanges(): void {
    if (this.id && this.action) {
      this.action(this.id, parseFloat(this.text.replace(/,/g, ''))).subscribe({
        next: (response) => {},
        error: (err) => {
          this.text = this.prev;
          alert('An error occurred during saving the number');
        },
      });
    }
    if (this.id && this.id2 && this.action2) {
      this.action2(
        this.id,
        this.id2,
        parseFloat(this.text.replace(/,/g, ''))
      ).subscribe({
        next: (response) => {
          if (response === false) {
            this.text = this.prev;
            alert('An error occurred during saving the number');
          }
        },
        error: () => {
          this.text = this.prev;
          alert('An error occurred during saving the number');
        },
      });
    }
  }
}
