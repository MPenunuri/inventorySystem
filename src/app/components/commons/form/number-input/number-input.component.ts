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

    this.value = this.formatNumber(value);
    inputElement.value = this.value;
    this.onChange(this.value.replace(/,/g, ''));
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
}
