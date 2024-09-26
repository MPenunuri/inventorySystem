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
  private subcategoryUpdate?: SubcategoryUpdate;
  private newSubcategory?: SubcategoryCreate;

  constructor(private http: HttpClient) {}

  setSubcategoryUpdate(id: number, categoryId?: number, name?: string) {
    this.subcategoryUpdate = new SubcategoryUpdate(id, categoryId, name);
  }

  setNewSubcategory(categoryId: number, name: string) {
    this.newSubcategory = new SubcategoryCreate(categoryId, name);
  }

  registerSubcategory(): Observable<SubcategoryEntityI> {
    if (this.newSubcategory == undefined) {
      throw new Error('Undefined subcategory data');
    }
    return this.http.post<SubcategoryEntityI>(
      '/api/secure/subcategory',
      this.newSubcategory.toObject()
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

  changeSubcategoryCategory(): Observable<SubcategoryEntityI> {
    if (
      this.subcategoryUpdate == undefined ||
      this.subcategoryUpdate.categoryId == undefined
    ) {
      throw new Error('Undefined subcategory data');
    }
    return this.http.patch<SubcategoryEntityI>(
      '/api/secure/subcategory/category',
      this.subcategoryUpdate.toObject()
    );
  }

  renameSubcategory(): Observable<SubcategoryEntityI> {
    if (
      this.subcategoryUpdate == undefined ||
      this.subcategoryUpdate.name == undefined
    ) {
      throw new Error('Undefined subcategory data');
    }
    return this.http.patch<SubcategoryEntityI>(
      '/api/secure/subcategory',
      this.subcategoryUpdate.toObject()
    );
  }

  deleteSubcategory(id: number): Observable<void> {
    return this.http.delete<void>('/api/secure/subcategory/' + id);
  }
}
