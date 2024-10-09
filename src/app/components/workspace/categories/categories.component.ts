import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';
import { CategoryEntityI } from '../../../models/category/category-entity';
import { SortArrayService } from '../../../services/utils/sort-array.service';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CommonModule } from '@angular/common';
import { AddSubcategoryComponent } from './add-subcategory/add-subcategory.component';
import { CategorieAndSubcategorie } from '../../../models/category/categorieAndSubcategorie';
import { EditableTextComponent } from '../../commons/editable/editable-text/editable-text.component';
import { SubcategoryService } from '../../../services/subcategory/subcategory.service';
import { RouterLink } from '@angular/router';
import { SmallDeleteButtonComponent } from '../../commons/button/small-delete-button/small-delete-button.component';
import { SmallEditButtonComponent } from '../../commons/button/small-edit-button/small-edit-button.component';
import { EditableNavComponent } from '../../commons/editable/editable-nav/editable-nav.component';
import { LoadingComponent } from '../../commons/loading/loading.component';
import { SmallNavButtonComponent } from '../../commons/button/small-nav-button/small-nav-button.component';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [
    CommonModule,
    AddCategoryComponent,
    AddSubcategoryComponent,
    EditableTextComponent,
    EditableNavComponent,
    RouterLink,
    SmallDeleteButtonComponent,
    SmallEditButtonComponent,
    SmallNavButtonComponent,
    LoadingComponent,
  ],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  categories?: CategoryEntityI[];
  categoriesAndSubcategories?: CategorieAndSubcategorie[];
  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';

  constructor(
    public service: CategoryService,
    public subService: SubcategoryService,
    public sortService: SortArrayService
  ) {}

  setCategories() {
    this.service.getCategories().subscribe({
      next: (data: CategoryEntityI[]) => {
        this.categories = data;
        this.sortService.sort(this.categories, 'name');
      },
    });
  }

  setCategoriesAndSubcategories() {
    this.service.getCategoriesAndSubcategories().subscribe({
      next: (data: CategorieAndSubcategorie[]) => {
        this.categoriesAndSubcategories = data;
        this.sort('categoryName');
        this.sort('subcategoryName');
      },
    });
  }

  ngOnInit(): void {
    this.setCategories();
    this.setCategoriesAndSubcategories();
  }

  sort(column: keyof CategorieAndSubcategorie) {
    if (this.categoriesAndSubcategories !== undefined) {
      this.categoriesAndSubcategories = this.sortService.sort(
        this.categoriesAndSubcategories,
        column
      );
    }
  }
}
