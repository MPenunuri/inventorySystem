import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { baseUrlInterceptor } from './base-url.interceptor';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('baseUrlInterceptor', () => {
  let httpClient: HttpClient;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([baseUrlInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    httpTesting = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should intercept req and add base url', (done) => {
    httpClient.get('/api/secure/test').subscribe();

    const req = httpTesting.expectOne(
      'https://inventory-system-production-6a39.up.railway.app/api/secure/test'
    );
    req.flush(null);
    done();
  });
});
