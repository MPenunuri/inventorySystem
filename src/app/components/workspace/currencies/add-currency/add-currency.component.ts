import { Component, EventEmitter, Output } from '@angular/core';
import { CurrencyService } from '../../../../services/currency/currency.service';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { InputSanitizerService } from '../../../../services/input-sanitizer/input-sanitizer.service';
import { ButtonComponent } from '../../../commons/button/button.component';
import { FormComponent } from '../../../commons/form/form.component';
import { currencies } from './currencies';
import { SelectInputComponent } from '../../../commons/form/select-input/select-input.component';
import { SelectOption } from '../../../../models/select-option/select-option';

@Component({
  selector: 'app-add-currency',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormComponent,
    SelectInputComponent,
    ButtonComponent,
  ],
  templateUrl: './add-currency.component.html',
  styleUrl: './add-currency.component.scss',
})
export class AddCurrencyComponent {
  form: FormGroup;
  open: boolean;
  @Output() saved: EventEmitter<void> = new EventEmitter();
  currencies: SelectOption[];

  constructor(
    private fb: FormBuilder,
    private service: CurrencyService,
    private sanitizer: InputSanitizerService
  ) {
    this.currencies = currencies;
    this.open = false;
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)], []],
    });
  }

  onSubmit() {
    const name = this.sanitizer.sanitize(this.form.value.name);
    this.service.registerCurrency(name).subscribe({
      next: (entity) => {
        this.saved.emit();
        this.open = !this.open;
        this.form.reset();
      },
      error: (error) => {
        alert('An error occurred during currency registry. Please try again.');
      },
    });
  }

  toggleOpen() {
    this.open = !this.open;
  }

  get buttonName() {
    return this.open ? 'Close' : 'Add a new currency';
  }
}
