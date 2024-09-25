import { TestBed } from '@angular/core/testing';

import { CurrencyService } from './currency.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { NewCurrency, CurrencyUpdate } from '../../models/currency/currency';
import { CurrencyEntity } from '../../models/currency/currency-entity';

describe('CurrencyService', () => {
  let service: CurrencyService;
  let httpTesting: HttpTestingController;

  const mockNewCurrency = new NewCurrency('MXN');
  const mockCurrencyUpdate = new CurrencyUpdate(1, 'MXN');
  const mockCurrencyEntity = new CurrencyEntity(1, 1, 'MXN');
  const mockCurrencyEntityArray = [mockCurrencyEntity];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(CurrencyService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register currency', (done) => {
    service.setNewCurrency(mockCurrencyEntity.name);
    service.registerCurrency().subscribe({
      next: (response) => {
        expect(response).toEqual(mockCurrencyEntity);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });
    const req = httpTesting.expectOne('/api/secure/currency');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockNewCurrency);
    req.flush(mockCurrencyEntity);
  });

  it('should get currencies', (done) => {
    service.getCurrencies().subscribe({
      next: (response) => {
        expect(response).toEqual(mockCurrencyEntityArray);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });
    const req = httpTesting.expectOne('/api/secure/currency');
    expect(req.request.method).toBe('GET');
    req.flush(mockCurrencyEntityArray);
  });

  it('should send correct data when updating currency', (done) => {
    service.setCurrencyUpdate(mockCurrencyUpdate.id, mockCurrencyUpdate.name);
    service.renameCurrency().subscribe({
      next: (response) => {
        expect(response).toEqual(mockCurrencyEntity);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne('/api/secure/currency');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(mockCurrencyUpdate);
    req.flush(mockCurrencyEntity);
  });

  it('should delete currency', (done) => {
    service.deleteCurrency(1).subscribe({
      next: (response) => {
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });
    const req = httpTesting.expectOne('/api/secure/currency/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should throw error when no currency data is set for update', () => {
    expect(() => service.renameCurrency()).toThrowError(
      'Undefined currency data'
    );
  });

  it('should throw error when no currency data is set for registry', () => {
    expect(() => service.registerCurrency()).toThrowError(
      'Undefined currency data'
    );
  });
});
