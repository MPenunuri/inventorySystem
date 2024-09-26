import { TestBed } from '@angular/core/testing';

import { PostProductService } from './post-product.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { ProductEntityI } from '../../models/product/product-entity';

describe('PostProductService', () => {
  let service: PostProductService;
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
    service = TestBed.inject(PostProductService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a product', (done) => {
    const productName = 'New Product';

    service.registerProduct(productName).subscribe((response) => {
      expect(response).toEqual(mockProductEntity);
      done();
    });

    const req = httpTestingController.expectOne('/api/secure/product');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ name: productName });
    req.flush(mockProductEntity);
  });
});
