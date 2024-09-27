import { TestBed } from '@angular/core/testing';
import { AuthService } from './auth.service';
import { UserCredentials } from '../../../models/user/user-credentials';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';

describe('AuthService', () => {
  let service: AuthService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(AuthService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should login and return a token', () => {
    const mockUserCredentials = new UserCredentials(
      'email@example.com',
      'password123'
    );
    const mockToken = 'mock-token';

    service.setUserCredentials(
      mockUserCredentials.email,
      mockUserCredentials.password
    );

    service.login().subscribe((token) => {
      expect(token).toBe(mockToken);
      expect(service.isAuthenticated).toBeTrue();
    });

    const req = httpTesting.expectOne('/api/auth/login');
    expect(req.request.method).toBe('POST');
    req.flush(mockToken);
  });

  it('should handle login error', () => {
    const mockUserCredentials = new UserCredentials(
      'email@example.com',
      'password123'
    );

    service.setUserCredentials(
      mockUserCredentials.email,
      mockUserCredentials.password
    );

    service.login().subscribe({
      next: () => fail('Expected an error, not a token'),
      error: (error) => {
        expect(error.error).toBe('Login failed');
        expect(service.isAuthenticated).toBeFalse();
      },
    });

    const req = httpTesting.expectOne('/api/auth/login');
    req.flush('Login failed', { status: 401, statusText: 'Unauthorized' });
  });

  it('should throw an error if credentials are undefined', () => {
    expect(() => service.login()).toThrow(new Error('Undefined credentials'));
  });
});
