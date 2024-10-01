import { Component } from '@angular/core';
import { SubcategoryService } from '../../../../services/subcategory/subcategory.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ButtonComponent } from '../../../commons/button/button.component';
import { FormComponent } from '../../../commons/form/form.component';
import { InputSanitizerService } from '../../../../services/input-sanitizer/input-sanitizer.service';
import { CategoryService } from '../../../../services/category/category.service';
import { CategoryEntityI } from '../../../../models/category/category-entity';
import { SelectInputComponent } from '../../../commons/form/select-input/select-input.component';

@Component({
  selector: 'app-change-subcategory-category',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormComponent,
    SelectInputComponent,
    ButtonComponent,
  ],
  templateUrl: './change-subcategory-category.component.html',
  styleUrl: './change-subcategory-category.component.scss',
})
export class ChangeSubcategoryCategoryComponent {
  id?: number;
  subcategoryName?: string;
  categories: CategoryEntityI[] = [];
  form: FormGroup;

  constructor(
    private route: ActivatedRoute,
    private sanitizer: InputSanitizerService,
    private service: SubcategoryService,
    private catService: CategoryService,
    private fb: FormBuilder,
    private router: Router
  ) {
    this.form = this.fb.group({
      categoryId: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('id');
    const paramName = this.route.snapshot.paramMap.get('name');
    if (paramId !== null) {
      this.id = parseInt(paramId);
    }
    if (paramName !== null) {
      this.subcategoryName = paramName;
    }
    this.catService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
      },
      error: (error) => {
        alert('No categories no assing');
      },
    });
  }

  onSubmit() {
    const categoryId = this.sanitizer.sanitize(this.form.value.categoryId);
    if (this.id !== undefined) {
      this.service
        .changeSubcategoryCategory(this.id, parseInt(categoryId))
        .subscribe({
          next: (token) => {
            this.router.navigate(['/workspace/categories']);
          },
          error: (error) => {
            alert('Update failed. Please try again.');
          },
        });
    }
  }
}
