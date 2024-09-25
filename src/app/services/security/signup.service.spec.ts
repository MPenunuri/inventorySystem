import { TestBed } from '@angular/core/testing';

import { SignupService } from './signup.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { User } from '../../models/user/user';
import { UserEntity, UserEntityI } from '../../models/user/user-entity';

describe('SignupService', () => {
  let service: SignupService;
  let httpTesting: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SignupService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should sign up and return user entity', (done) => {
    const mockUser = new User('John Doe', 'email@example.com', 'password123');

    service.setUser(mockUser.username, mockUser.email, mockUser.password);

    const userEntity: UserEntityI = new UserEntity(
      1,
      mockUser.username,
      mockUser.email,
      mockUser.password,
      'USER'
    );

    service.signUp().subscribe({
      next: (response) => {
        expect(response).toEqual(userEntity);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne('/api/auth/signup');
    expect(req.request.method).toBe('POST');
    req.flush(userEntity);
  });

  it('should handle sign up error', (done) => {
    const mockUser = new User('John Doe', 'email@example.com', 'password123');

    service.setUser(mockUser.username, mockUser.email, mockUser.password);

    service.signUp().subscribe({
      next: () => {
        fail('The request should have failed with a 400 status.');
      },
      error: (error) => {
        expect(error.status).toBe(400);
        expect(error.statusText).toBe('Invalid data');
        done();
      },
    });

    const req = httpTesting.expectOne('/api/auth/signup');
    req.flush('Signup failed', { status: 400, statusText: 'Invalid data' });
  });

  it('should throw an error if user data is undefined', () => {
    expect(() => service.signUp()).toThrow(new Error('Undefined user data'));
  });
});
