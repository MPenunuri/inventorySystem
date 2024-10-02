import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductEntityI } from '../../models/product/product-entity';
import { ProductUpdate } from '../../models/product/product-update';

@Injectable({
  providedIn: 'root',
})
export class PatchProductService {
  constructor(private http: HttpClient) {}

  updateProductName(
    productId: number,
    name: string
  ): Observable<ProductEntityI> {
    const productUpdate = new ProductUpdate(productId);
    productUpdate.name = name;
    return this.http.patch<ProductEntityI>(
      '/api/secure/product/name',
      productUpdate.toObject()
    );
  }

  updateSubcategory(
    productId: number,
    subcategoryId: number
  ): Observable<ProductEntityI> {
    const productUpdate = new ProductUpdate(productId);
    productUpdate.subcategoryId = subcategoryId;
    return this.http.patch<ProductEntityI>(
      '/api/secure/product/subcategory',
      productUpdate.toObject()
    );
  }

  updateProductPresentation(
    productId: number,
    productPresentation: string
  ): Observable<ProductEntityI> {
    const productUpdate = new ProductUpdate(productId);
    productUpdate.productPresentation = productPresentation;
    return this.http.patch<ProductEntityI>(
      '/api/secure/product/presentation',
      productUpdate.toObject()
    );
  }

  updateMinimumStock(
    productId: number,
    stock: number
  ): Observable<ProductEntityI> {
    const productUpdate = new ProductUpdate(productId);
    productUpdate.minimumStock = stock;
    return this.http.patch<ProductEntityI>(
      '/api/secure/product/minimumStock',
      productUpdate.toObject()
    );
  }

  updateRetailPrice(
    productId: number,
    price: number
  ): Observable<ProductEntityI> {
    const productUpdate = new ProductUpdate(productId);
    productUpdate.retailPrice = price;
    return this.http.patch<ProductEntityI>(
      '/api/secure/product/retailprice',
      productUpdate.toObject()
    );
  }

  updateWholesalePrice(
    productId: number,
    price: number
  ): Observable<ProductEntityI> {
    const productUpdate = new ProductUpdate(productId);
    productUpdate.wholesalePrice = price;
    return this.http.patch<ProductEntityI>(
      '/api/secure/product/wholesale',
      productUpdate.toObject()
    );
  }

  updatePriceCurrency(
    productId: number,
    currencyId: number
  ): Observable<ProductEntityI> {
    const productUpdate = new ProductUpdate(productId);
    productUpdate.priceCurrencyId = currencyId;
    return this.http.patch<ProductEntityI>(
      '/api/secure/product/currency',
      productUpdate.toObject()
    );
  }
}
