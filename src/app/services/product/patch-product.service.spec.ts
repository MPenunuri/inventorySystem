import { TestBed } from '@angular/core/testing';

import { PatchProductService } from './patch-product.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ProductEntityI } from '../../models/product/product-entity';

describe('PatchProductService', () => {
  let service: PatchProductService;
  let httpTestingController: HttpTestingController;

  const mockProductEntity: ProductEntityI = {
    user_id: 1,
    id: 1,
    name: 'Test Product',
    subcategory_id: 1,
    product_presentation: 'Box',
    minimum_stock: 50,
    retail_price: 100,
    wholesale_price: 80,
    price_currency_id: 1,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PatchProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should update product name', (done) => {
    const newName = 'Updated Product Name';
    service
      .updateProductName(mockProductEntity.id, newName)
      .subscribe((response) => {
        expect(response).toEqual(mockProductEntity);
        done();
      });

    const req = httpTestingController.expectOne('/api/secure/product/name');
    expect(req.request.method).toBe('PATCH');
    req.flush(mockProductEntity);
  });

  it('should update subcategory ID', (done) => {
    const newSubcategoryId = 2;
    service
      .updateSubcategory(mockProductEntity.id, newSubcategoryId)
      .subscribe((response) => {
        expect(response).toEqual(mockProductEntity);
        done();
      });

    const req = httpTestingController.expectOne(
      '/api/secure/product/subcategory'
    );
    expect(req.request.method).toBe('PATCH');
    req.flush(mockProductEntity);
  });

  it('should update product presentation', (done) => {
    const newPresentation = 'Updated Product Presentation';
    service
      .updateProductPresentation(mockProductEntity.id, newPresentation)
      .subscribe((response) => {
        expect(response).toEqual(mockProductEntity);
        done();
      });

    const req = httpTestingController.expectOne(
      '/api/secure/product/presentation'
    );
    expect(req.request.method).toBe('PATCH');
    req.flush(mockProductEntity);
  });

  it('should update minimum stock', (done) => {
    const newMinimumStock = 60;
    service
      .updateMinimumStock(mockProductEntity.id, newMinimumStock)
      .subscribe((response) => {
        expect(response).toEqual(mockProductEntity);
        done();
      });

    const req = httpTestingController.expectOne(
      '/api/secure/product/minimumStock'
    );
    expect(req.request.method).toBe('PATCH');
    req.flush(mockProductEntity);
  });

  it('should update retail price', (done) => {
    const newRetailPrice = 120;
    service
      .updateRetailPrice(mockProductEntity.id, newRetailPrice)
      .subscribe((response) => {
        expect(response).toEqual(mockProductEntity);
        done();
      });

    const req = httpTestingController.expectOne(
      '/api/secure/product/retailprice'
    );
    expect(req.request.method).toBe('PATCH');
    req.flush(mockProductEntity);
  });

  it('should update wholesale price', (done) => {
    const newWholesalePrice = 90;
    service
      .updateWholesalePrice(mockProductEntity.id, newWholesalePrice)
      .subscribe((response) => {
        expect(response).toEqual(mockProductEntity);
        done();
      });

    const req = httpTestingController.expectOne(
      '/api/secure/product/wholesale'
    );
    expect(req.request.method).toBe('PATCH');
    req.flush(mockProductEntity);
  });

  it('should update price currency ID', (done) => {
    const newCurrencyId = 2;
    service
      .updatePriceCurrency(mockProductEntity.id, newCurrencyId)
      .subscribe((response) => {
        expect(response).toEqual(mockProductEntity);
        done();
      });

    const req = httpTestingController.expectOne('/api/secure/product/currency');
    expect(req.request.method).toBe('PATCH');
    req.flush(mockProductEntity);
  });
});
