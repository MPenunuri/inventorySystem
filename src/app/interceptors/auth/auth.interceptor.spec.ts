import { TestBed } from '@angular/core/testing';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import {
  HttpClient,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { AuthService } from '../../services/security/auth/auth.service';
import { authInterceptor } from './auth.interceptor';

describe('authInterceptor', () => {
  let httpClient: HttpClient;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(withInterceptors([authInterceptor])),
        provideHttpClientTesting(),
      ],
    });
    httpTesting = TestBed.inject(HttpTestingController);
    httpClient = TestBed.inject(HttpClient);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should add Authorization header with Bearer token when token is present', () => {
    const authService = TestBed.inject(AuthService);
    authService.token = 'test-token';
    httpClient.get('/api/secure/test').subscribe();
    const req = httpTesting.expectOne('/api/secure/test');
    expect(req.request.headers.get('Authorization')).toBe('Bearer test-token');
    req.flush({});
  });

  it('should not add Authorization header when token is undefined', () => {
    const authService = TestBed.inject(AuthService);
    authService.token = undefined;
    httpClient.get('/api/secure/test').subscribe();
    const req = httpTesting.expectOne('/api/secure/test');
    expect(req.request.headers.has('Authorization')).toBeFalsy();
    req.flush({});
  });
});
