import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';

@Component({
  selector: 'app-number-input',
  standalone: true,
  imports: [],
  templateUrl: './number-input.component.html',
  styleUrl: './number-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => NumberInputComponent),
      multi: true,
    },
  ],
})
export class NumberInputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() decimals: number = 0;
  value: string = '';
  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value;
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event) {
    const inputElement = event.target as HTMLInputElement;
    let value = inputElement.value;

    // Save the original cursor position and count commas before formatting
    const selectionStart = inputElement.selectionStart || 0;
    const originalCommasBeforeCursor = this.countCommas(value, selectionStart);

    // Remove invalid characters (except numbers and decimal point)
    value = value.replace(/[^0-9.]/g, '');

    // Apply formatting
    const formattedValue = this.formatNumber(value);

    // Store the formatted value
    this.value = formattedValue;
    inputElement.value = formattedValue;
    this.onChange(this.value.replace(/,/g, ''));

    // Count the new commas after formatting
    const newCommasBeforeCursor = this.countCommas(
      formattedValue,
      selectionStart
    );

    // Calculate the necessary cursor adjustment
    let cursorPositionAdjustment =
      newCommasBeforeCursor - originalCommasBeforeCursor;

    // If the cursor is after the decimal point, do not adjust for commas
    const decimalIndex = formattedValue.indexOf('.');
    if (decimalIndex !== -1 && selectionStart > decimalIndex) {
      cursorPositionAdjustment = 0;
    }

    // Calculate the new cursor position
    const newCursorPosition = selectionStart + cursorPositionAdjustment;

    // Move the cursor to the correct position
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
}
