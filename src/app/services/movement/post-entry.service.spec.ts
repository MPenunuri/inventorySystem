import { TestBed } from '@angular/core/testing';

import { PostEntryService } from './post-entry.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { MovementEntityI } from '../../models/movement/movement-entity';

describe('PostEntryService', () => {
  let service: PostEntryService;
  let httpTesting: HttpTestingController;

  const mockResponse: MovementEntityI = {
    user_id: 1,
    id: 1,
    product_id: 1,
    date_time: new Date('2024-09-25T15:06:02.000Z'),
    type: '',
    subtype: '',
    reason: '',
    comment: '',
    quantity: 20,
    supplier_id: null,
    from_location_id: null,
    to_location_id: null,
    transaction_type: null,
    transaction_subtype: null,
    transaction_value: 1000,
    transaction_currency_id: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PostEntryService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call addAcquisition and return a MovementEntityI', (done) => {
    service
      .addAcquisition(
        1,
        new Date(),
        'Test Reason',
        'Test Comment',
        10,
        2,
        3,
        'purchase',
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

    const req = httpTesting.expectOne('/api/secure/movement/acquisition');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(
      jasmine.objectContaining({
        productId: 1,
        dateTime: jasmine.any(Date),
        reason: 'Test Reason',
        comment: 'Test Comment',
        quantity: 10,
        supplierId: 2,
        toLocationId: 3,
        transactionSubtype: 'purchase',
        transactionValue: 1000,
        transactionCurrencyId: 1,
      })
    );
    req.flush(mockResponse);
  });

  it('should call addCustomerReturn and return a MovementEntityI', (done) => {
    service
      .addCustomerReturn(
        1,
        new Date(),
        'Customer Return Reason',
        'Test Comment',
        5,
        3,
        'refund',
        500,
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

    const req = httpTesting.expectOne('/api/secure/movement/customer-return');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should call addEntryInventoryAdjustment and return a MovementEntityI', (done) => {
    service
      .addEntryInventoryAdjustment(
        1,
        new Date(),
        'Adjustment Reason',
        'Test Comment',
        8,
        4
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

    const req = httpTesting.expectOne('/api/secure/movement/entry-adjusment');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });

  it('should call addProduction and return a MovementEntityI', (done) => {
    service
      .addProduction(
        1,
        new Date(),
        'Production Reason',
        'Test Comment',
        12,
        5,
        'manufacturing',
        1200,
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

    const req = httpTesting.expectOne('/api/secure/movement/production');
    expect(req.request.method).toBe('POST');
    req.flush(mockResponse);
  });
});
