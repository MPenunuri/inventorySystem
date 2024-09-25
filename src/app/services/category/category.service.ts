import { Injectable } from '@angular/core';
import {
  NewCategory,
  CategoryUpdate,
  CategoryI,
} from '../../models/category/category';
import { HttpClient } from '@angular/common/http';
import { CreateEntityI } from '../../models/create-entity';
import { Observable } from 'rxjs';
import { CategoryEntityI } from '../../models/category/category-entity';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  private categoryUpdate?: CategoryI;
  private newCategory?: CreateEntityI<CategoryI>;

  constructor(private http: HttpClient) {}

  setCategoryUpdate(id: number, name: string) {
    this.categoryUpdate = new CategoryUpdate(id, name);
  }

  setNewCategory(name: string) {
    this.newCategory = new NewCategory(name);
  }

  registerCategory(): Observable<CategoryEntityI> {
    if (this.newCategory == undefined) {
      throw new Error('Undefined category data');
    }
    return this.http.post<CategoryEntityI>(
      '/api/secure/category',
      this.newCategory
    );
  }

  getCategories(): Observable<CategoryEntityI[]> {
    return this.http.get<CategoryEntityI[]>('/api/secure/category');
  }

  updateCategoryName(): Observable<CategoryEntityI> {
    if (this.categoryUpdate == undefined) {
      throw new Error('Undefined category data');
    }
    return this.http.patch<CategoryEntityI>(
      '/api/secure/category',
      this.categoryUpdate
    );
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>('/api/secure/category/' + id);
  }
}
