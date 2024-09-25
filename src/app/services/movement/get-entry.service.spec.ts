import { TestBed } from '@angular/core/testing';

import { GetEntryService } from './get-entry.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AcquisitionI } from '../../models/movement/entry/acquisition';
import { AvgCostProductI } from '../../models/movement/entry/avg-cost-product';
import { ProductionI } from '../../models/movement/entry/production';

describe('GetEntryService', () => {
  let service: GetEntryService;
  let httpTesting: HttpTestingController;

  const mockAcquisition: AcquisitionI = {
    movementId: 1,
    productId: 1,
    productName: '',
    productPresentation: '',
    dateTime: new Date(),
    type: '',
    subtype: '',
    reason: '',
    comment: '',
    quantity: 20,
    supplierId: 1,
    supplierName: '',
    toLocationId: 1,
    toLocationName: '',
    costType: '',
    cost: 1,
    costCurrency: '',
  };
  const mockProduction: ProductionI = {
    movementId: 1,
    productId: 1,
    productName: '',
    productPresentation: '',
    dateTime: new Date(),
    type: '',
    subtype: '',
    reason: '',
    comment: '',
    quantity: 20,
    toLocationId: 1,
    toLocationName: '',
    costType: '',
    cost: 1,
    costCurrency: '',
  };
  const mockAvgCostProduct: AvgCostProductI = {
    productId: 1,
    productName: '',
    productCategoryId: 1,
    productCategory: '',
    productSubcategoryId: 1,
    productSubcategory: '',
    productPresentation: '',
    costType: 1,
    averageCostValue: 1,
    costCurrency: '',
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(GetEntryService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get acquisitions', (done) => {
    service.getAcquisitions().subscribe({
      next: (response) => {
        expect(response).toEqual([mockAcquisition]);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne('/api/secure/movement/acquisition');
    expect(req.request.method).toBe('GET');
    req.flush([mockAcquisition]);
  });

  it('should get productions', (done) => {
    service.getProductions().subscribe({
      next: (response) => {
        expect(response).toEqual([mockProduction]);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne('/api/secure/movement/production"');
    expect(req.request.method).toBe('GET');
    req.flush([mockProduction]);
  });

  it('should find acquisitions by cost and year', (done) => {
    service
      .findAcquisitionsByCostAndYear(1, 'RETAIL', 1000, 5000, 2010, 2020)
      .subscribe({
        next: (response) => {
          expect(response).toEqual([mockAcquisition]);
          done();
        },
        error: () => {
          fail('The request should not have failed.');
        },
      });

    const req = httpTesting.expectOne(
      '/acquisition/cost/1?costType=RETAIL&minCost=1000&maxCost=5000&fromYear=2010&toYear=2020'
    );
    expect(req.request.method).toBe('GET');
    req.flush([mockAcquisition]);
  });

  it('should get average unit cost by acquisition', (done) => {
    service.getAvgUnitCostByAcquisition(1, 2, 2010, 2020).subscribe({
      next: (response) => {
        expect(response).toEqual([mockAvgCostProduct]);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne(
      '/acquisition/avg-unit/cost/1?currencyId=2&fromYear=2010&toYear=2020'
    );
    expect(req.request.method).toBe('GET');
    req.flush([mockAvgCostProduct]);
  });

  it('should get average total cost by acquisition', (done) => {
    service.getAvgTotalCostByAcquisition(1, 2, 2010, 2020).subscribe({
      next: (response) => {
        expect(response).toEqual([mockAvgCostProduct]);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne(
      '/acquisition/avg-total/cost/1?currencyId=2&fromYear=2010&toYear=2020'
    );
    expect(req.request.method).toBe('GET');
    req.flush([mockAvgCostProduct]);
  });
});
