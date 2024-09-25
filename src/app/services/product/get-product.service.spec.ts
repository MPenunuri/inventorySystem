import { TestBed } from '@angular/core/testing';

import { GetProductService } from './get-product.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { InventoryProductI } from '../../models/product/inventory-product';
import { StandardProductI } from '../../models/product/standard-product';
import { LocationProductI } from '../../models/product/location-product';
import { StockProductI } from '../../models/product/stock-product';
import { SupplierProductI } from '../../models/product/supplier-product';

describe('GetProductService', () => {
  let service: GetProductService;
  let httpTesting: HttpTestingController;

  const mockInventoryProduct: InventoryProductI = {
    id: 1,
    name: 'Test Product',
    subcategory: {
      id: 1,
      category: { id: 1, name: 'Test Category' },
      name: 'Test Subcategory',
    },
    stockList: [
      {
        id: 1,
        location: { id: 1, name: 'Warehouse' },
        quantity: 100,
        maximumStorage: 500,
      },
    ],
    productPresentation: 'Box',
    suppliers: [{ id: 1, name: 'Test Supplier' }],
    minimumStock: { stock: 50, registered: true },
    sellingPrice: { retail: 10, wholesale: 8, currency: 'USD' },
  };

  const mockStandardProducts: StandardProductI[] = [
    {
      productId: 1,
      productName: 'Product 1',
      categoryId: 1,
      categoryName: 'Category 1',
      subcategoryId: 1,
      subcategoryName: 'Subcategory 1',
      productPresentation: 'Box',
      minimumStock: 50,
      retailPrice: 15,
      wholesalePrice: 12,
      priceCurrency: 'USD',
    },
  ];

  const mockSupplierProducts: SupplierProductI[] = [
    {
      supplierId: 1,
      supplierName: 'Test Supplier',
      productId: 1,
      productName: 'Product 1',
      categoryId: 1,
      categoryName: 'Category 1',
      subcategoryId: 1,
      subcategoryName: 'Subcategory 1',
      productPresentation: 'Box',
      minimumStock: 50,
      retailPrice: 15,
      wholesalePrice: 12,
      priceCurrency: 'USD',
    },
  ];

  const mockLocationProducts: LocationProductI[] = [
    {
      stockLocationId: 1,
      stockLocationName: 'Warehouse',
      stockLocationAddress: '123 Warehouse Street',
      stockLocationQuantity: 100,
      stockLocationMaximumStorage: 500,
      productId: 1,
      productName: 'Product 1',
      categoryId: 1,
      categoryName: 'Category 1',
      subcategoryId: 1,
      subcategoryName: 'Subcategory 1',
      productPresentation: 'Box',
      minimumStock: 50,
      retailPrice: 15,
      wholesalePrice: 12,
      priceCurrency: 'USD',
    },
  ];

  const mockStockProducts: StockProductI[] = [
    {
      id: 1,
      name: 'Product 1',
      productPresentation: 'Box',
      minimumStock: 50,
      totalStock: 100,
    },
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(GetProductService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get a product by ID', (done) => {
    service.getProductById(1).subscribe({
      next: (response) => {
        expect(response).toEqual(mockInventoryProduct);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne('/api/secure/product/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockInventoryProduct);
  });

  it('should get all products', (done) => {
    service.getAllProducts().subscribe({
      next: (response) => {
        expect(response).toEqual(mockStandardProducts);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne('/api/secure/product');
    expect(req.request.method).toBe('GET');
    req.flush(mockStandardProducts);
  });

  it('should get products by category ID', (done) => {
    service.getProductsByCategoryId(1).subscribe({
      next: (response) => {
        expect(response).toEqual(mockStandardProducts);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne('/api/secure/product/category/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockStandardProducts);
  });

  it('should get products by supplier ID', (done) => {
    service.getProductsBySupplierId(1).subscribe({
      next: (response) => {
        expect(response).toEqual(mockSupplierProducts);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne('/api/secure/product/supplier/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockSupplierProducts);
  });

  it('should get products by location ID', (done) => {
    service.getProductsByLocationId(1).subscribe({
      next: (response) => {
        expect(response).toEqual(mockLocationProducts);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne('/api/secure/product/location/1');
    expect(req.request.method).toBe('GET');
    req.flush(mockLocationProducts);
  });

  it('should find products with minimum stock', (done) => {
    service.findProductsWithMinimumStock().subscribe({
      next: (response) => {
        expect(response).toEqual(mockStockProducts);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne('/api/secure/product/stock/minimum');
    expect(req.request.method).toBe('GET');
    req.flush(mockStockProducts);
  });
});
