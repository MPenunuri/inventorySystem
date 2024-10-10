import { Component } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';
import { CategoryEntityI } from '../../../models/category/category-entity';
import { SortArrayService } from '../../../services/utils/sort-array.service';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CommonModule } from '@angular/common';
import { AddSubcategoryComponent } from './add-subcategory/add-subcategory.component';
import { CategorieAndSubcategorie } from '../../../models/category/fullCategorie';
import { EditableTextComponent } from '../../commons/editable/editable-text/editable-text.component';
import { SubcategoryService } from '../../../services/subcategory/subcategory.service';
import { RouterLink } from '@angular/router';
import { SmallDeleteButtonComponent } from '../../commons/button/small-delete-button/small-delete-button.component';
import { SmallEditButtonComponent } from '../../commons/button/small-edit-button/small-edit-button.component';
import { EditableNavComponent } from '../../commons/editable/editable-nav/editable-nav.component';
import { LoadingComponent } from '../../commons/loading/loading.component';
import { SmallNavButtonComponent } from '../../commons/button/small-nav-button/small-nav-button.component';
import { Subject, debounceTime } from 'rxjs';

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
  filteredCategoriesAndSubcategories?: CategorieAndSubcategorie[];
  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';

  filterSubject: Subject<string> = new Subject<string>();

  constructor(
    public service: CategoryService,
    public subService: SubcategoryService,
    public sortService: SortArrayService
  ) {
    this.filterSubject.pipe(debounceTime(500)).subscribe((filterText) => {
      this.applyFilter(filterText);
    });
  }

  setData() {
    this.setCategories();
    this.setCategoriesAndSubcategories();
  }

  setCategories() {
    this.service.getCategories().subscribe({
      next: (data: CategoryEntityI[]) => {
        this.categories = data;
        this.sortService.sort(this.categories, 'name');
      },
      error: () => {
        this.categories = [];
      },
    });
  }

  setCategoriesAndSubcategories() {
    this.service.getCategoriesAndSubcategories().subscribe({
      next: (data: CategorieAndSubcategorie[]) => {
        this.categoriesAndSubcategories = data;
        this.filteredCategoriesAndSubcategories = data;
        this.sort('categoryName');
        this.sort('subcategoryName');
      },
      error: () => {
        this.categoriesAndSubcategories = [];
        this.filteredCategoriesAndSubcategories = [];
      },
    });
  }

  ngOnInit(): void {
    this.setData();
  }

  sort(column: keyof CategorieAndSubcategorie) {
    if (this.filteredCategoriesAndSubcategories !== undefined) {
      this.filteredCategoriesAndSubcategories = this.sortService.sort(
        this.filteredCategoriesAndSubcategories,
        column
      );
    }
  }

  applyFilter(filterText: string) {
    if (this.categoriesAndSubcategories) {
      if (!filterText) {
        this.filteredCategoriesAndSubcategories = [
          ...this.categoriesAndSubcategories,
        ];
      } else {
        const regex = new RegExp(filterText, 'i');
        this.filteredCategoriesAndSubcategories =
          this.categoriesAndSubcategories.filter((i) => {
            return (
              regex.test(i.categoryName) ||
              regex.test(i.subcategoryName) ||
              regex.test(i.products.toString())
            );
          });
      }
    }
  }

  onFilterChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterSubject.next(input.value);
  }
}
