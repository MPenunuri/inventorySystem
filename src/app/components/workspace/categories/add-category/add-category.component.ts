import { Component, EventEmitter, Output } from '@angular/core';
import { CategoryService } from '../../../../services/category/category.service';
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
import { TextInputComponent } from '../../../commons/form/text-input/text-input.component';

@Component({
  selector: 'app-add-category',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormComponent,
    TextInputComponent,
    ButtonComponent,
  ],
  templateUrl: './add-category.component.html',
  styleUrl: './add-category.component.scss',
})
export class AddCategoryComponent {
  form: FormGroup;
  open: boolean;
  @Output() saved: EventEmitter<void> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private service: CategoryService,
    private sanitizer: InputSanitizerService
  ) {
    this.open = false;
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)], []],
    });
  }

  onSubmit() {
    const name = this.sanitizer.sanitize(this.form.value.name);
    this.service.registerCategory(name).subscribe({
      next: (entity) => {
        this.saved.emit();
        this.open = !this.open;
        this.form.reset();
      },
      error: (error) => {
        alert('An error occurred during category registry. Please try again.');
      },
    });
  }

  toggleOpen() {
    this.open = !this.open;
  }
}
