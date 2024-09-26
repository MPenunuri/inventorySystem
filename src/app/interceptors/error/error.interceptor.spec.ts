import { TestBed } from '@angular/core/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';

import { errorInterceptor } from './error.interceptor';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('errorInterceptor', () => {
  let httpClient: HttpClient;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([errorInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    httpTesting = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should intercept error response and log the error message', (done) => {
    const errorMessage = 'Something went wrong';
    const errorStatus = 404;

    httpClient.get('/api/secure/test').subscribe({
      next: () => {
        fail('The request should have failed.');
      },
      error: (error) => {
        expect(error.message).toContain(
          `Error Code: ${errorStatus}\nMessage: ${errorMessage}`
        );
        done();
      },
    });

    const req = httpTesting.expectOne('/api/secure/test');
    req.flush(errorMessage, { status: errorStatus, statusText: 'Not Found' });
  });
});
