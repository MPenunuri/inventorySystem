import { TestBed } from '@angular/core/testing';

import { SubcategoryService } from './subcategory.service';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { SubcategoryEntityI } from '../../models/subcategory/subcategory-entity';
import { provideHttpClient } from '@angular/common/http';

describe('SubcategoryService', () => {
  let service: SubcategoryService;
  let httpTestingController: HttpTestingController;

  const mockSubcategoryEntity: SubcategoryEntityI = {
    user_id: 1,
    id: 1,
    name: 'Test Subcategory',
    category_id: 1,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(SubcategoryService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register a subcategory', (done) => {
    service.setNewSubcategory(1, 'New Subcategory');

    service.registerSubcategory().subscribe({
      next: (response) => {
        expect(response).toEqual(mockSubcategoryEntity);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTestingController.expectOne('/api/secure/subcategory');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual({
      categoryId: 1,
      name: 'New Subcategory',
    });
    req.flush(mockSubcategoryEntity);
  });

  it('should throw error when registering undefined subcategory', () => {
    expect(() => service.registerSubcategory()).toThrowError(
      'Undefined subcategory data'
    );
  });

  it('should get all subcategories', (done) => {
    service.getAllSubcategories().subscribe({
      next: (response) => {
        expect(response).toEqual([mockSubcategoryEntity]);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTestingController.expectOne('/api/secure/subcategory');
    expect(req.request.method).toBe('GET');
    req.flush([mockSubcategoryEntity]);
  });

  it('should find subcategories by category ID', (done) => {
    service.findSubcategoriesByCategoryId(1).subscribe({
      next: (response) => {
        expect(response).toEqual([mockSubcategoryEntity]);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTestingController.expectOne(
      '/api/secure/subcategory/category/1'
    );
    expect(req.request.method).toBe('GET');
    req.flush([mockSubcategoryEntity]);
  });

  it('should change subcategory category', (done) => {
    service.setSubcategoryUpdate(1, 2, 'Updated Subcategory');

    service.changeSubcategoryCategory().subscribe({
      next: (response) => {
        expect(response).toEqual(mockSubcategoryEntity);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTestingController.expectOne(
      '/api/secure/subcategory/category'
    );
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({
      id: 1,
      categoryId: 2,
      name: 'Updated Subcategory',
    });
    req.flush(mockSubcategoryEntity);
  });

  it('should throw error when changing category with undefined data', () => {
    expect(() => service.changeSubcategoryCategory()).toThrowError(
      'Undefined subcategory data'
    );
  });

  it('should rename subcategory', (done) => {
    service.setSubcategoryUpdate(1, undefined, 'Renamed Subcategory');

    service.renameSubcategory().subscribe({
      next: (response) => {
        expect(response).toEqual(mockSubcategoryEntity);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTestingController.expectOne('/api/secure/subcategory');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual({
      id: 1,
      name: 'Renamed Subcategory',
    });
    req.flush(mockSubcategoryEntity);
  });

  it('should throw error when renaming with undefined data', () => {
    expect(() => service.renameSubcategory()).toThrowError(
      'Undefined subcategory data'
    );
  });

  it('should delete subcategory', (done) => {
    const subcategoryId = 1;

    service.deleteSubcategory(subcategoryId).subscribe({
      next: () => {
        expect(true).toBe(true);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTestingController.expectOne(
      `/api/secure/subcategory/${subcategoryId}`
    );
    expect(req.request.method).toBe('DELETE');
    req.flush({});
  });
});
