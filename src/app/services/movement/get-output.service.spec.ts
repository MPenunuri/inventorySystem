import { TestBed } from '@angular/core/testing';

import { GetOutputService } from './get-output.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { AvgSellProductI } from '../../models/movement/output/avg-sell-product';
import { InternalConsumptionI } from '../../models/movement/output/internal-consumption';
import { OutputAdjustmentI } from '../../models/movement/output/output-adjustment';
import { SaleI } from '../../models/movement/output/sale';
import { SupplierReturnI } from '../../models/movement/output/supplier-return';

describe('GetOutputService', () => {
  let service: GetOutputService;
  let httpTesting: HttpTestingController;

  const mockSale: SaleI = {
    movementId: 1,
    productId: 1,
    productName: 'Product A',
    productPresentation: 'Box',
    dateTime: new Date(),
    type: 'Output',
    subtype: 'Sale',
    reason: 'Sold',
    comment: 'Successful transaction',
    quantity: 50,
    fromLocationId: 1,
    fromLocationName: 'Warehouse A',
    selltype: 'Retail',
    sell: 1000,
    sellCurrency: 'USD',
  };

  const mockSupplierReturn: SupplierReturnI = {
    movementId: 2,
    productId: 2,
    productName: 'Product B',
    productPresentation: 'Box',
    dateTime: new Date(),
    type: 'Output',
    subtype: 'Supplier Return',
    reason: 'Defective',
    comment: 'Returned to supplier',
    quantity: 30,
    fromLocationId: 1,
    fromLocationName: 'Warehouse A',
    supplierId: 1,
    supplierName: 'Supplier A',
    refundType: 'Full',
    refund: 500,
    refundCurrency: 'USD',
  };

  const mockOutputAdjustment: OutputAdjustmentI = {
    movementId: 3,
    productId: 3,
    productName: 'Product C',
    productPresentation: 'Box',
    dateTime: new Date(),
    type: 'Output',
    subtype: 'Adjustment',
    reason: 'Inventory discrepancy',
    comment: 'Adjusted quantity',
    quantity: 10,
    fromLocationId: 1,
    fromLocationName: 'Warehouse A',
  };

  const mockInternalConsumption: InternalConsumptionI = {
    movementId: 4,
    productId: 4,
    productName: 'Product D',
    productPresentation: 'Box',
    dateTime: new Date(),
    type: 'Output',
    subtype: 'Internal Consumption',
    reason: 'Office use',
    comment: 'Used internally',
    quantity: 20,
    fromLocationId: 1,
    fromLocationName: 'Warehouse A',
  };

  const mockAvgSellProduct: AvgSellProductI = {
    productId: 1,
    productName: 'Product A',
    productCategoryId: 1,
    productCategory: 'Electronics',
    productSubcategoryId: 1,
    productSubcategory: 'Phones',
    productPresentation: 'Box',
    sellType: 1,
    averageSellValue: 1000,
    sellCurrency: 'USD',
    sells: 50,
  };

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(GetOutputService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should get sales', (done) => {
    service.getSales(0).subscribe({
      next: (response) => {
        expect(response).toEqual([mockSale]);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne('/api/secure/movement/sale');
    expect(req.request.method).toBe('GET');
    req.flush([mockSale]);
  });

  it('should get supplier returns', (done) => {
    service.getSupplierReturns(0).subscribe({
      next: (response) => {
        expect(response).toEqual([mockSupplierReturn]);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne('/api/secure/movement/supplier-return"');
    expect(req.request.method).toBe('GET');
    req.flush([mockSupplierReturn]);
  });

  it('should get output inventory adjustments', (done) => {
    service.getOutputInventoryAdjustments(0).subscribe({
      next: (response) => {
        expect(response).toEqual([mockOutputAdjustment]);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne('/api/secure/movement/output-adjusment"');
    expect(req.request.method).toBe('GET');
    req.flush([mockOutputAdjustment]);
  });

  it('should get internal consumption movements', (done) => {
    service.getInternalConsumptionMovements(0).subscribe({
      next: (response) => {
        expect(response).toEqual([mockInternalConsumption]);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne(
      '/api/secure/movement/internal-consumption"'
    );
    expect(req.request.method).toBe('GET');
    req.flush([mockInternalConsumption]);
  });

  it('should find sales by value and year', (done) => {
    service
      .findSalesByValueAndYear(1, 'Retail', 500, 2000, 2015, 2020)
      .subscribe({
        next: (response) => {
          expect(response).toEqual([mockSale]);
          done();
        },
        error: () => {
          fail('The request should not have failed.');
        },
      });

    const req = httpTesting.expectOne(
      '/acquisition/sales/1?sellType=Retail&minValue=500&maxValue=2000&fromYear=2015&toYear=2020'
    );
    expect(req.request.method).toBe('GET');
    req.flush([mockSale]);
  });

  it('should get average unit sell value', (done) => {
    service.getAvgUnitSellValue(1, 2, 2010, 2020).subscribe({
      next: (response) => {
        expect(response).toEqual([mockAvgSellProduct]);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne(
      '/sales/avg-unit/1?currencyId=2&fromYear=2010&toYear=2020'
    );
    expect(req.request.method).toBe('GET');
    req.flush([mockAvgSellProduct]);
  });

  it('should get average total sell value', (done) => {
    service.getAvgTotalSellValue(1, 2, 2010, 2020).subscribe({
      next: (response) => {
        expect(response).toEqual([mockAvgSellProduct]);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne(
      '/sales/avg-total/1?currencyId=2&fromYear=2010&toYear=2020'
    );
    expect(req.request.method).toBe('GET');
    req.flush([mockAvgSellProduct]);
  });
});
