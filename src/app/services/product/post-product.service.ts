import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductEntityI } from '../../models/product/product-entity';

@Injectable({
  providedIn: 'root',
})
export class PostProductService {
  constructor(private http: HttpClient) {}

  registerProduct(name: string): Observable<ProductEntityI> {
    return this.http.post<ProductEntityI>('/api/secure/product', { name });
  }
}
