import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubcategoryEntityI } from '../../models/subcategory/subcategory-entity';
import { SubcategoryCreate } from '../../models/subcategory/subcategory-create';
import { SubcategoryUpdate } from '../../models/subcategory/subcategory-update';

@Injectable({
  providedIn: 'root',
})
export class SubcategoryService {
  constructor(private http: HttpClient) {}

  registerSubcategory(
    categoryId: number,
    name: string
  ): Observable<SubcategoryEntityI> {
    const newSubcategory = new SubcategoryCreate(categoryId, name);
    return this.http.post<SubcategoryEntityI>(
      '/api/secure/subcategory',
      newSubcategory.toObject()
    );
  }

  findSubcategoriesByCategoryId(id: number) {
    return this.http.get<SubcategoryEntityI[]>(
      '/api/secure/subcategory/category/' + id
    );
  }

  getAllSubcategories(): Observable<SubcategoryEntityI[]> {
    return this.http.get<SubcategoryEntityI[]>('/api/secure/subcategory');
  }

  changeSubcategoryCategory(
    id: number,
    categoryId: number
  ): Observable<SubcategoryEntityI> {
    const subcategoryUpdate = new SubcategoryUpdate(id, categoryId);
    return this.http.patch<SubcategoryEntityI>(
      '/api/secure/subcategory/category',
      subcategoryUpdate.toObject()
    );
  }

  renameSubcategory(id: number, name: string): Observable<SubcategoryEntityI> {
    const subcategoryUpdate = new SubcategoryUpdate(id, undefined, name);
    return this.http.patch<SubcategoryEntityI>(
      '/api/secure/subcategory',
      subcategoryUpdate.toObject()
    );
  }

  deleteSubcategory(id: number): Observable<void> {
    return this.http.delete<void>('/api/secure/subcategory/' + id);
  }
}
