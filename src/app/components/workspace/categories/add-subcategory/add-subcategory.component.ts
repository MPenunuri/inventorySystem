import { Component, EventEmitter, Input, Output, OnInit } from '@angular/core';
import { SubcategoryService } from '../../../../services/subcategory/subcategory.service';
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
import { SelectInputComponent } from '../../../commons/form/select-input/select-input.component';
import { CategoryEntityI } from '../../../../models/category/category-entity';

@Component({
  selector: 'app-add-subcategory',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormComponent,
    TextInputComponent,
    SelectInputComponent,
    ButtonComponent,
  ],
  templateUrl: './add-subcategory.component.html',
  styleUrl: './add-subcategory.component.scss',
})
export class AddSubcategoryComponent {
  form: FormGroup;
  open: boolean;
  @Output() saved: EventEmitter<void> = new EventEmitter();
  @Input() categories: CategoryEntityI[] = [];

  constructor(
    private fb: FormBuilder,
    private service: SubcategoryService,
    private sanitizer: InputSanitizerService
  ) {
    this.open = false;
    this.form = this.fb.group({
      categoryId: ['', [Validators.required], []],
      name: ['', [Validators.required, Validators.maxLength(255)], []],
    });
  }

  onSubmit() {
    const categoryId = this.sanitizer.sanitize(this.form.value.categoryId);
    if (!categoryId) {
      return alert('Select a category');
    }
    const name = this.sanitizer.sanitize(this.form.value.name);
    if (name.length === 0) {
      return alert('Register a subcategory');
    }

    this.service.registerSubcategory(parseInt(categoryId), name).subscribe({
      next: (entity) => {
        this.saved.emit();
        this.open = !this.open;
        this.form.reset();
      },
      error: (error) => {
        alert(
          'An error occurred during subcategory registry. Please try again.'
        );
      },
    });
  }

  toggleOpen() {
    this.open = !this.open;
  }
}
