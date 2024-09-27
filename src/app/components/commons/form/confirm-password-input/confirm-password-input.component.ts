import { Component, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-confirm-password-input',
  standalone: true,
  imports: [],
  templateUrl: './confirm-password-input.component.html',
  styleUrl: './confirm-password-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ConfirmPasswordInputComponent),
      multi: true,
    },
  ],
})
export class ConfirmPasswordInputComponent implements ControlValueAccessor {
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
    this.onChange(inputElement.value);
  }
}
