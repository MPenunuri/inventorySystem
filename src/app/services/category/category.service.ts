import { Injectable } from '@angular/core';
import {
  NewCategory,
  CategoryUpdate,
  CategoryI,
} from '../../models/category/category';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { CategoryEntityI } from '../../models/category/category-entity';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  constructor(private http: HttpClient) {}

  registerCategory(name: string): Observable<CategoryEntityI> {
    const newCategory = new NewCategory(name);
    return this.http.post<CategoryEntityI>(
      '/api/secure/category',
      newCategory.toObject()
    );
  }

  getCategories(): Observable<CategoryEntityI[]> {
    return this.http.get<CategoryEntityI[]>('/api/secure/category');
  }

  updateCategoryName(id: number, name: string): Observable<CategoryEntityI> {
    const categoryUpdate = new CategoryUpdate(id, name);
    return this.http.patch<CategoryEntityI>(
      '/api/secure/category',
      categoryUpdate.toObject()
    );
  }

  deleteCategory(id: number): Observable<void> {
    return this.http.delete<void>('/api/secure/category/' + id);
  }
}
