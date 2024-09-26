import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SupplierEntityI } from '../../models/supplier/supplier-entity';

@Injectable({
  providedIn: 'root',
})
export class SupplierService {
  constructor(private http: HttpClient) {}

  registerSupplier(name: string): Observable<SupplierEntityI> {
    return this.http.post<SupplierEntityI>('/api/secure/supplier', { name });
  }

  getSuppliers(): Observable<SupplierEntityI[]> {
    return this.http.get<SupplierEntityI[]>('/api/secure/supplier');
  }

  renameSupplier(id: number, name: string): Observable<SupplierEntityI> {
    return this.http.patch<SupplierEntityI>('/api/secure/supplier', {
      id,
      name,
    });
  }

  deleteSupplier(id: number): Observable<void> {
    return this.http.delete<void>('/api/secure/supplier/' + id);
  }

  addProductSupplierRelation(
    productId: number,
    supplierId: number
  ): Observable<boolean> {
    return this.http.post<boolean>('/api/secure/supplier/product', {
      productId,
      supplierId,
    });
  }

  deleteProductSupplierRelation(
    productId: number,
    supplierId: number
  ): Observable<boolean> {
    const params = new HttpParams()
      .set('productId', productId)
      .set('supplierId', supplierId);
    return this.http.delete<boolean>('/api/secure/supplier/product', {
      params,
    });
  }
}
