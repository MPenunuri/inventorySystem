import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SaleI } from '../../models/movement/output/sale';
import { SupplierReturnI } from '../../models/movement/output/supplier-return';
import { OutputAdjustmentI } from '../../models/movement/output/output-adjustment';
import { InternalConsumptionI } from '../../models/movement/output/internal-consumption';
import { AvgSellProductI } from '../../models/movement/output/avg-sell-product';

@Injectable({
  providedIn: 'root',
})
export class GetOutputService {
  constructor(private http: HttpClient) {}

  getSales(productId: number): Observable<SaleI[]> {
    return this.http.get<SaleI[]>('/api/secure/movement/sale/' + productId);
  }

  getSupplierReturns(productId: number): Observable<SupplierReturnI[]> {
    return this.http.get<SupplierReturnI[]>(
      '/api/secure/movement/supplier-return/' + productId
    );
  }

  getOutputInventoryAdjustments(
    productId: number
  ): Observable<OutputAdjustmentI[]> {
    return this.http.get<OutputAdjustmentI[]>(
      '/api/secure/movement/output-adjusment/' + productId
    );
  }

  getInternalConsumptionMovements(
    productId: number
  ): Observable<InternalConsumptionI[]> {
    return this.http.get<InternalConsumptionI[]>(
      '/api/secure/movement/internal-consumption/' + productId
    );
  }

  findSalesByValueAndYear(
    currencyId: number,
    sellType: string,
    minValue: number,
    maxValue: number,
    fromYear: number,
    toYear: number
  ): Observable<SaleI[]> {
    const params = new HttpParams()
      .set('sellType', sellType)
      .set('minValue', minValue.toString())
      .set('maxValue', maxValue.toString())
      .set('fromYear', fromYear.toString())
      .set('toYear', toYear.toString());
    return this.http.get<SaleI[]>('/acquisition/sales/' + currencyId, {
      params,
    });
  }

  getAvgUnitSellValue(
    productId: number,
    currencyId: number,
    fromYear: number,
    toYear: number
  ): Observable<AvgSellProductI[]> {
    const params = new HttpParams()
      .set('currencyId', currencyId)
      .set('fromYear', fromYear.toString())
      .set('toYear', toYear.toString());
    return this.http.get<AvgSellProductI[]>('/sales/avg-unit/' + productId, {
      params,
    });
  }

  getAvgTotalSellValue(
    productId: number,
    currencyId: number,
    fromYear: number,
    toYear: number
  ): Observable<AvgSellProductI[]> {
    const params = new HttpParams()
      .set('currencyId', currencyId)
      .set('fromYear', fromYear.toString())
      .set('toYear', toYear.toString());
    return this.http.get<AvgSellProductI[]>('/sales/avg-total/' + productId, {
      params,
    });
  }
}
