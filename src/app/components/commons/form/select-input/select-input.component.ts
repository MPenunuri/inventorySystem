import { CommonModule } from '@angular/common';
import { Component, forwardRef, Input, SimpleChanges } from '@angular/core';
import {
  NG_VALUE_ACCESSOR,
  ControlValueAccessor,
  FormsModule,
} from '@angular/forms';
import { SelectOption } from '../../../../models/select-option/select-option';

@Component({
  selector: 'app-select-input',
  standalone: true,
  imports: [CommonModule, FormsModule],
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
  @Input() defaultOption: string = '';

  ngOnChanges(changes: SimpleChanges) {
    if (changes['defaultOption'] && changes['defaultOption'].currentValue) {
      this.value = changes['defaultOption'].currentValue;
      this.onChange(this.value);
    }
  }

  value: string = '';
  onChange = (value: string) => {};
  onTouched = () => {};

  writeValue(value: string): void {
    this.value = value !== null ? value : this.defaultOption;
    this.onChange(this.value);
  }
  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }
  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onInputChange(event: Event) {
    const selectElement = event.target as HTMLSelectElement;
    this.value = selectElement.value;
    this.onChange(selectElement.value);
    this.onTouched();
  }
}
