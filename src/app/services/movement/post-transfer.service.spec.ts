import { TestBed } from '@angular/core/testing';

import { PostTransferService } from './post-transfer.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { MovementEntityI } from '../../models/movement/movement-entity';

describe('PostTransferService', () => {
  let service: PostTransferService;
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
    transaction_value: null,
    transaction_currency_id: null,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(PostTransferService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should call addTransfer and return a MovementEntityI', (done) => {
    service
      .addTransfer(
        1,
        new Date(),
        'Test Transfer Reason',
        'Test Transfer Comment',
        10,
        2,
        3
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

    const req = httpTesting.expectOne('/api/secure/movement/transfer');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(
      jasmine.objectContaining({
        productId: 1,
        dateTime: jasmine.any(Date),
        reason: 'Test Transfer Reason',
        comment: 'Test Transfer Comment',
        quantity: 10,
        fromLocationId: 2,
        toLocationId: 3,
      })
    );
    req.flush(mockResponse);
  });
});
