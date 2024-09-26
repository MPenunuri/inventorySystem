import { TestBed } from '@angular/core/testing';

import { CategoryService } from './category.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { provideHttpClient } from '@angular/common/http';
import { CategoryEntity } from '../../models/category/category-entity';

describe('CategoryService', () => {
  let service: CategoryService;
  let httpTesting: HttpTestingController;

  const mockCategoryEntity = new CategoryEntity(1, 1, 'Drinks');
  const mockCategoryEntityArray = [mockCategoryEntity];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CategoryService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register category', (done) => {
    service.registerCategory(mockCategoryEntity.name).subscribe({
      next: (response) => {
        expect(response).toEqual(mockCategoryEntity);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });
    const req = httpTesting.expectOne('/api/secure/category');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({ name: 'Drinks' });
    req.flush(mockCategoryEntity);
  });

  it('should get categories', (done) => {
    service.getCategories().subscribe({
      next: (response) => {
        expect(response).toEqual(mockCategoryEntityArray);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });
    const req = httpTesting.expectOne('/api/secure/category');
    expect(req.request.method).toBe('GET');
    req.flush(mockCategoryEntityArray);
  });

  it('should send correct data when updating category', (done) => {
    service
      .updateCategoryName(mockCategoryEntity.id, mockCategoryEntity.name)
      .subscribe({
        next: (response) => {
          expect(response).toEqual(mockCategoryEntity);
          done();
        },
        error: () => {
          fail('The request should not have failed.');
        },
      });

    const req = httpTesting.expectOne('/api/secure/category');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({ id: 1, name: 'Drinks' });
    req.flush(mockCategoryEntity);
  });

  it('should delete category', (done) => {
    service.deleteCategory(1).subscribe({
      next: (response) => {
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });
    const req = httpTesting.expectOne('/api/secure/category/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });
});
