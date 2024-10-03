import { Component, EventEmitter, Output } from '@angular/core';
import { TextInputComponent } from '../../../commons/form/text-input/text-input.component';
import { CommonModule } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../commons/button/button.component';
import { FormComponent } from '../../../commons/form/form.component';
import { LocationService } from '../../../../services/location/location.service';
import { InputSanitizerService } from '../../../../services/input-sanitizer/input-sanitizer.service';
import { TextAreaComponent } from '../../../commons/form/text-area/text-area.component';

@Component({
  selector: 'app-add-location',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormComponent,
    TextInputComponent,
    TextAreaComponent,
    ButtonComponent,
  ],
  templateUrl: './add-location.component.html',
  styleUrl: './add-location.component.scss',
})
export class AddLocationComponent {
  form: FormGroup;
  open: boolean;
  @Output() saved: EventEmitter<void> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private service: LocationService,
    private sanitizer: InputSanitizerService
  ) {
    this.open = false;
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)], []],
      address: ['', [Validators.required, Validators.maxLength(500)], []],
    });
  }

  onSubmit() {
    const name = this.sanitizer.sanitize(this.form.value.name);
    const address = this.sanitizer.sanitize(this.form.value.address);
    this.service.registerLocation(name, address).subscribe({
      next: (entity) => {
        this.saved.emit();
        this.open = !this.open;
        this.form.reset();
      },
      error: (error) => {
        alert('An error occurred during location registry. Please try again.');
      },
    });
  }

  toggleOpen() {
    this.open = !this.open;
  }
}
