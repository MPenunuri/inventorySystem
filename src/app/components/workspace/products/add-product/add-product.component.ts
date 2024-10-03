import { Component, EventEmitter, Output } from '@angular/core';
import { PostProductService } from '../../../../services/product/post-product.service';
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
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-product',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormComponent,
    TextInputComponent,
    ButtonComponent,
  ],
  templateUrl: './add-product.component.html',
  styleUrl: './add-product.component.scss',
})
export class AddProductComponent {
  form: FormGroup;
  open: boolean = false;
  @Output() saved: EventEmitter<void> = new EventEmitter();

  constructor(
    private fb: FormBuilder,
    private postService: PostProductService,
    private sanitizer: InputSanitizerService
  ) {
    this.form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(255)], []],
    });
  }

  onSubmit() {
    const name = this.sanitizer.sanitize(this.form.value.name);
    this.postService.registerProduct(name).subscribe({
      next: (entity) => {
        this.saved.emit();
        this.open = !this.open;
        this.form.reset();
      },
      error: (error) => {
        alert('An error occurred during product registry. Please try again.');
      },
    });
  }

  toggleOpen() {
    this.open = !this.open;
  }
}
