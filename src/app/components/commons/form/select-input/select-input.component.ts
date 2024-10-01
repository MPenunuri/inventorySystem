import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input } from '@angular/core';
import { NG_VALUE_ACCESSOR, ControlValueAccessor } from '@angular/forms';
import { SelectOption } from '../../../../models/select-option/select-option';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './select-input.component.html',
  styleUrl: './select-input.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectInputComponent),
      multi: true,
    },
  ],
})
export class SelectInputComponent<T extends SelectOption>
  implements ControlValueAccessor
{
  @Input() label: string = '';
  @Input() name: string = '';
  @Input() holder: string = '';
  @Input() options: T[] = [];
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
    this.onTouched();
  }
}
