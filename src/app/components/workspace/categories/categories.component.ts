import { Component, EventEmitter, Output } from '@angular/core';
import { CategoryService } from '../../../services/category/category.service';
import { CategoryEntityI } from '../../../models/category/category-entity';
import { SortArrayService } from '../../../services/utils/sort-array.service';
import { AddCategoryComponent } from './add-category/add-category.component';
import { CommonModule } from '@angular/common';
import { AddSubcategoryComponent } from './add-subcategory/add-subcategory.component';
import { CategorieAndSubcategorie } from '../../../models/category/categorieAndsubcategorie';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule, AddCategoryComponent, AddSubcategoryComponent],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss',
})
export class CategoriesComponent {
  categories?: CategoryEntityI[];
  categoriesAndSubcategories?: CategorieAndSubcategorie[];
  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';
  @Output() saved: EventEmitter<void> = new EventEmitter();

  constructor(
    private service: CategoryService,
    public sortService: SortArrayService
  ) {}

  setCategories() {
    this.service.getCategories().subscribe({
      next: (data: CategoryEntityI[]) => {
        this.categories = data;
        this.sortService.sort(this.categories, 'name');
        this.saved.emit();
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
