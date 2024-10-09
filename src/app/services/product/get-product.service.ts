import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { InventoryProductI } from '../../models/product/inventory-product';
import { StandardProductI } from '../../models/product/standard-product';
import { SupplierProductI } from '../../models/product/supplier-product';
import { LocationProductI } from '../../models/product/location-product';
import { StockProductI } from '../../models/product/stock-product';

@Injectable({
  providedIn: 'root',
})
export class GetProductService {
  constructor(private http: HttpClient) {}

  getProductById(id: number): Observable<InventoryProductI> {
    return this.http.get<InventoryProductI>('/api/secure/product/' + id);
  }

  getAllProducts(): Observable<StandardProductI[]> {
    return this.http.get<StandardProductI[]>('/api/secure/product/all');
  }

  getProductsByCategoryId(id: number): Observable<StandardProductI[]> {
    return this.http.get<StandardProductI[]>(
      '/api/secure/product/category/' + id
    );
  }

  getProductsBySubcategoryId(id: number): Observable<StandardProductI[]> {
    return this.http.get<StandardProductI[]>(
      '/api/secure/product/subcategory/' + id
    );
  }

  getProductsBySupplierId(id: number): Observable<SupplierProductI[]> {
    return this.http.get<SupplierProductI[]>(
      '/api/secure/product/supplier/' + id
    );
  }

  getProductsWithNoSupplierRelation(
    id: number
  ): Observable<StandardProductI[]> {
    return this.http.get<StandardProductI[]>(
      '/api/secure/product/no-supplier/' + id
    );
  }

  getProductsByLocationId(id: number): Observable<LocationProductI[]> {
    return this.http.get<LocationProductI[]>(
      '/api/secure/product/location/' + id
    );
  }

  findProductsWithMinimumStock(): Observable<StockProductI[]> {
    return this.http.get<StockProductI[]>('/api/secure/product/stock/minimum');
  }

  getProductStockById(id: number): Observable<StockProductI[]> {
    return this.http.get<StockProductI[]>('/api/secure/product/stock/' + id);
  }

  getProductsByPriceCurrency(id: number): Observable<StandardProductI[]> {
    return this.http.get<StandardProductI[]>(
      '/api/secure/product/currency/' + id
    );
  }

  getProductsBySellingRetailPrice(
    currencyId: number,
    min: number,
    max: number
  ): Observable<StandardProductI[]> {
    const params = new HttpParams()
      .set('currencyId', currencyId)
      .set('min', min.toString())
      .set('max', max.toString());
    return this.http.get<StandardProductI[]>(
      '/api/secure/product/price/retail',
      { params }
    );
  }

  getProductsBySellingWholesalePrice(
    currencyId: number,
    min: number,
    max: number
  ): Observable<StandardProductI[]> {
    const params = new HttpParams()
      .set('currencyId', currencyId)
      .set('min', min.toString())
      .set('max', max.toString());
    return this.http.get<StandardProductI[]>(
      '/api/secure/product/price/wholesale',
      { params }
    );
  }
}
