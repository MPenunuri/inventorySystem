import { TestBed } from '@angular/core/testing';

import { DeleteProductService } from './delete-product.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('DeleteProductService', () => {
  let service: DeleteProductService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(DeleteProductService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should delete product', (done) => {
    service.deleteProductById(1).subscribe({
      next: (response) => {
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne('/api/secure/product/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
