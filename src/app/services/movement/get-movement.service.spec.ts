import { TestBed } from '@angular/core/testing';

import { GetMovementService } from './get-movement.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { EntryI } from '../../models/movement/entry/entry';
import { OutputI } from '../../models/movement/output/output';
import { StandardMovementI } from '../../models/movement/standard-movement';
import { TransferI } from '../../models/movement/transfer/transfer';

describe('GetMovementService', () => {
  let service: GetMovementService;
  let httpTesting: HttpTestingController;

  const mockMovement: StandardMovementI = {
    movementId: 1,
    productId: 1,
    productName: 'Product A',
    productPresentation: 'Box',
    dateTime: new Date(),
    type: 'Entry',
    subtype: 'Purchase',
    reason: 'Restock',
    comment: 'No issues',
    quantity: 100,
  };

  const mockEntry: EntryI = {
    ...mockMovement,
    toLocationId: 1,
    toLocationName: 'Warehouse A',
  };

  const mockOutput: OutputI = {
    ...mockMovement,
    fromLocationId: 1,
    fromLocationName: 'Warehouse A',
  };

  const mockTransfer: TransferI = {
    ...mockEntry,
    fromLocationId: 1,
    fromLocationName: 'Warehouse A',
    toLocationId: 2,
    toLocationName: 'Warehouse B',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(GetMovementService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get movements', (done) => {
    service.getMovements(0).subscribe({
      next: (response) => {
        expect(response).toEqual([mockMovement]);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne('/api/secure/movement');
    expect(req.request.method).toBe('GET');
    req.flush([mockMovement]);
  });

  it('should get entries', (done) => {
    service.getEntries(0).subscribe({
      next: (response) => {
        expect(response).toEqual([mockEntry]);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne('/api/secure/movement/entry');
    expect(req.request.method).toBe('GET');
    req.flush([mockEntry]);
  });

  it('should get outputs', (done) => {
    service.getOutputs(0).subscribe({
      next: (response) => {
        expect(response).toEqual([mockOutput]);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne('/api/secure/movement/output');
    expect(req.request.method).toBe('GET');
    req.flush([mockOutput]);
  });

  it('should get transfers', (done) => {
    service.getTransfers(0).subscribe({
      next: (response) => {
        expect(response).toEqual([mockTransfer]);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne('/api/secure/movement/transfer');
    expect(req.request.method).toBe('GET');
    req.flush([mockTransfer]);
  });
});
