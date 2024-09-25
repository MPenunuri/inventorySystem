import { TestBed } from '@angular/core/testing';

import { PostOutputService } from './post-output.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { MovementEntityI } from '../../models/movement/movement-entity';

describe('PostOutputService', () => {
  let service: PostOutputService;
  let httpTesting: HttpTestingController;

  const mockResponse: MovementEntityI = {
    user_id: 1,
    id: 1,
    product_id: 1,
    date_time: new Date('2024-09-25T15:06:02.000Z'),
    type: 'sale',
    subtype: 'retail',
    reason: 'Test Reason',
    comment: 'Test Comment',
    quantity: 5,
    supplier_id: null,
    from_location_id: 2,
    to_location_id: null,
    transaction_type: 'sale',
    transaction_subtype: 'retail',
    transaction_value: 1500,
    transaction_currency_id: 1,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PostOutputService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call addSalesOutput and return a MovementEntityI', (done) => {
    service
      .addSalesOutput(
        1,
        new Date(),
        'Test Reason',
        'Test Comment',
        5,
        2,
        'retail',
        1500,
        1
      )
      .subscribe({
        next: (response) => {
          expect(response).toEqual(jasmine.objectContaining(mockResponse));
          expect(response.date_time.getTime()).toEqual(
            mockResponse.date_time.getTime()
          );
          done();
        },
        error: () => {
          fail('The request should not have failed.');
        },
      });

    const req = httpTesting.expectOne('/api/secure/movement/sale');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should call addSupplierReturn and return a MovementEntityI', (done) => {
    service
      .addSupplierReturn(
        1,
        new Date(),
        'Test Return Reason',
        'Test Return Comment',
        5,
        3,
        2,
        'return',
        1000,
        1
      )
      .subscribe({
        next: (response) => {
          expect(response).toEqual(jasmine.objectContaining(mockResponse));
          expect(response.date_time.getTime()).toEqual(
            mockResponse.date_time.getTime()
          );
          done();
        },
        error: () => {
          fail('The request should not have failed.');
        },
      });

    const req = httpTesting.expectOne('/api/secure/movement/supplier-return');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should call addOutputInventoryAdjustment and return a MovementEntityI', (done) => {
    service
      .addOutputInventoryAdjustment(
        1,
        new Date(),
        'Test Adjustment Reason',
        'Test Adjustment Comment',
        5,
        2
      )
      .subscribe({
        next: (response) => {
          expect(response).toEqual(jasmine.objectContaining(mockResponse));
          expect(response.date_time.getTime()).toEqual(
            mockResponse.date_time.getTime()
          );
          done();
        },
        error: () => {
          fail('The request should not have failed.');
        },
      });

    const req = httpTesting.expectOne('/api/secure/movement/output-adjustment');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(
      jasmine.objectContaining({
        productId: 1,
        dateTime: jasmine.any(Date),
        reason: 'Test Adjustment Reason',
        comment: 'Test Adjustment Comment',
        quantity: 5,
        fromLocationId: 2,
      })
    );
    req.flush(mockResponse);
  });

  it('should call addInternalConsumption and return a MovementEntityI', (done) => {
    service
      .addInternalConsumption(
        1,
        new Date(),
        'Test Consumption Reason',
        'Test Consumption Comment',
        5,
        2
      )
      .subscribe({
        next: (response) => {
          expect(response).toEqual(jasmine.objectContaining(mockResponse));
          expect(response.date_time.getTime()).toEqual(
            mockResponse.date_time.getTime()
          );
          done();
        },
        error: () => {
          fail('The request should not have failed.');
        },
      });

    const req = httpTesting.expectOne(
      '/api/secure/movement/internal-consumption'
    );
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(
      jasmine.objectContaining({
        productId: 1,
        dateTime: jasmine.any(Date),
        reason: 'Test Consumption Reason',
        comment: 'Test Consumption Comment',
        quantity: 5,
        fromLocationId: 2,
      })
    );
    req.flush(mockResponse);
  });
});
