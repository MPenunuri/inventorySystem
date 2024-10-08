import { Component } from '@angular/core';
import { Location } from '@angular/common';
import { SubcategoryEntityI } from '../../../../models/subcategory/subcategory-entity';
import { PatchProductService } from '../../../../services/product/patch-product.service';
import { CategoryService } from '../../../../services/category/category.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterLink } from '@angular/router';
import { CategoryEntityI } from '../../../../models/category/category-entity';
import { InputSanitizerService } from '../../../../services/input-sanitizer/input-sanitizer.service';
import { SubcategoryService } from '../../../../services/subcategory/subcategory.service';
import { ButtonComponent } from '../../../commons/button/button.component';
import { FormComponent } from '../../../commons/form/form.component';
import { SelectInputComponent } from '../../../commons/form/select-input/select-input.component';

@Component({
  selector: 'app-assign-category',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormComponent,
    SelectInputComponent,
    ButtonComponent,
    RouterLink,
  ],
  templateUrl: './assign-category.component.html',
  styleUrl: './assign-category.component.scss',
})
export class AssignCategoryComponent {
  form: FormGroup;
  private productId?: number;
  public productName?: string;
  public currentCategoryId?: number;
  public currentSubcategoryId?: number;
  categories: CategoryEntityI[] = [];
  subcategories: SubcategoryEntityI[] = [];
  filteredSubcategories: SubcategoryEntityI[] = [];

  constructor(
    private location: Location,
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private sanitizer: InputSanitizerService,
    private service: PatchProductService,
    private catService: CategoryService,
    private subService: SubcategoryService
  ) {
    this.form = this.fb.group({
      categoryId: ['', [Validators.required], []],
      subcategoryId: ['', [Validators.required], []],
    });
  }

  ngOnInit(): void {
    const paramProductId = this.route.snapshot.paramMap.get('productId');
    const paramProductName = this.route.snapshot.paramMap.get('productName');
    const paramCurrentSubcategoryId = this.route.snapshot.paramMap.get(
      'currentSubcategoryId'
    );

    if (paramProductId !== null) {
      this.productId = parseInt(paramProductId);
    }
    if (paramProductName !== null) {
      this.productName = paramProductName;
    }

    this.catService.getCategories().subscribe({
      next: (data) => {
        this.categories = data;
        if (this.currentCategoryId) {
          this.form.get('categoryId')?.setValue(this.currentCategoryId);
        }
      },
      error: () => {
        alert('No categories to assign. Register one.');
        this.router.navigate(['/workspace/categories']);
      },
    });

    this.subService.getAllSubcategories().subscribe({
      next: (data) => {
        this.subcategories = data;
        if (paramCurrentSubcategoryId !== null) {
          this.currentSubcategoryId = parseInt(paramCurrentSubcategoryId);
          const currentSubcategory = this.subcategories.find(
            (i) => i.id === this.currentSubcategoryId
          );
          if (currentSubcategory) {
            this.currentCategoryId = currentSubcategory.category_id;
            this.filteredSubcategories = this.subcategories.filter(
              (i) => i.category_id === currentSubcategory.category_id
            );
            this.form.get('subcategoryId')?.setValue(this.currentSubcategoryId);
          }
        }
      },
      error: () => {
        alert('No subcategories to assign. Register one.');
        this.router.navigate(['/workspace/categories']);
      },
    });

    this.form
      .get('categoryId')
      ?.valueChanges.subscribe((categoryId: string) => {
        this.filteredSubcategories = this.subcategories.filter(
          (subcategory) => subcategory.category_id === parseInt(categoryId)
        );
        this.form.get('subcategoryId')?.reset();
      });
  }

  onSubmit() {
    const subcategoryId = this.sanitizer.sanitize(
      this.form.value.subcategoryId
    );
    if (subcategoryId === '') {
      alert('Select a valid option');
    }
    if (this.productId && subcategoryId !== '') {
      this.service
        .updateSubcategory(this.productId, parseInt(subcategoryId))
        .subscribe({
          next: (entity) => {
            this.form.reset();
            this.location.back();
          },
          error: (error) => {
            alert('An error occurred during registry. Please try again.');
          },
        });
    }
  }
}
