import { TestBed } from '@angular/core/testing';

import { SupplierService } from './supplier.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { SupplierEntityI } from '../../models/supplier/supplier-entity';

describe('SupplierService', () => {
  let service: SupplierService;
  let httpTestingController: HttpTestingController;

  const mockSupplierEntity: SupplierEntityI = {
    user_id: 1,
    id: 1,
    name: 'Test Supplier',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SupplierService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a supplier', (done) => {
    const supplierName = 'New Supplier';

    service.registerSupplier(supplierName).subscribe({
      next: (response) => {
        expect(response).toEqual(mockSupplierEntity);
        done();
      },
      error: () => fail('The request should not have failed.'),
    });

    const req = httpTestingController.expectOne('/api/secure/supplier');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ name: supplierName });

    req.flush(mockSupplierEntity);
  });

  it('should get all suppliers', (done) => {
    service.getSuppliers().subscribe({
      next: (response) => {
        expect(response).toEqual([mockSupplierEntity]);
        done();
      },
      error: () => fail('The request should not have failed.'),
    });

    const req = httpTestingController.expectOne('/api/secure/supplier');
    expect(req.request.method).toBe('GET');

    req.flush([mockSupplierEntity]);
  });

  it('should rename a supplier', (done) => {
    const supplierId = 1;
    const newName = 'Updated Supplier';

    service.renameSupplier(supplierId, newName).subscribe({
      next: (response) => {
        expect(response).toEqual(mockSupplierEntity);
        done();
      },
      error: () => fail('The request should not have failed.'),
    });

    const req = httpTestingController.expectOne('/api/secure/supplier');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ id: supplierId, name: newName });

    req.flush(mockSupplierEntity);
  });

  it('should delete a supplier', (done) => {
    const supplierId = 1;

    service.deleteSupplier(supplierId).subscribe({
      next: () => {
        expect(true).toBe(true);
        done();
      },
      error: () => fail('The request should not have failed.'),
    });

    const req = httpTestingController.expectOne(
      `/api/secure/supplier/${supplierId}`
    );
    expect(req.request.method).toBe('DELETE');

    req.flush({});
  });

  it('should add a product-supplier relation', (done) => {
    const productId = 1;
    const supplierId = 1;

    service.addProductSupplierRelation(productId, supplierId).subscribe({
      next: (response) => {
        expect(response).toBeTrue();
        done();
      },
      error: () => fail('The request should not have failed.'),
    });

    const req = httpTestingController.expectOne('/api/secure/supplier/product');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ productId, supplierId });

    req.flush(true);
  });

  it('should delete a product-supplier relation', (done) => {
    const productId = 1;
    const supplierId = 1;

    service.deleteProductSupplierRelation(productId, supplierId).subscribe({
      next: (response) => {
        expect(response).toBeTrue();
        done();
      },
      error: () => fail('The request should not have failed.'),
    });

    const req = httpTestingController.expectOne(
      (req) =>
        req.method === 'DELETE' &&
        req.url === '/api/secure/supplier/product' &&
        req.params.get('productId') === `${productId}` &&
        req.params.get('supplierId') === `${supplierId}`
    );

    req.flush(true);
  });
});
