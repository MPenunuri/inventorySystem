import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AcquisitionI } from '../../models/movement/entry/acquisition';
import { CustomerReturnI } from '../../models/movement/entry/customer-return';
import { EntryAdjustmentI } from '../../models/movement/entry/entry-adjustment';
import { ProductionI } from '../../models/movement/entry/production';
import { AvgCostProductI } from '../../models/movement/entry/avg-cost-product';

@Injectable({
  providedIn: 'root',
})
export class GetEntryService {
  constructor(private http: HttpClient) {}

  getAcquisitions(): Observable<AcquisitionI[]> {
    return this.http.get<AcquisitionI[]>('/api/secure/movement/acquisition');
  }

  getCustomerReturns(): Observable<CustomerReturnI[]> {
    return this.http.get<CustomerReturnI[]>(
      '/api/secure/movement/customer-return'
    );
  }

  getEntryInventoryAdjustments(): Observable<EntryAdjustmentI[]> {
    return this.http.get<EntryAdjustmentI[]>(
      '/api/secure/movement/entry-adjustment'
    );
  }

  getProductions(): Observable<ProductionI[]> {
    return this.http.get<ProductionI[]>('/api/secure/movement/production"');
  }

  getAcquisitionsBySupplierId(id: number) {
    return this.http.get<AcquisitionI[]>(
      '/api/secure/movement/acquisition/supplier/' + id
    );
  }

  findAcquisitionsByCostAndYear(
    currencyId: number,
    costType: string,
    minCost: number,
    maxCost: number,
    fromYear: number,
    toYear: number
  ): Observable<AcquisitionI[]> {
    const params = new HttpParams()
      .set('costType', costType)
      .set('minCost', minCost.toString())
      .set('maxCost', maxCost.toString())
      .set('fromYear', fromYear.toString())
      .set('toYear', toYear.toString());
    return this.http.get<AcquisitionI[]>('/acquisition/cost/' + currencyId, {
      params,
    });
  }

  getAvgUnitCostByAcquisition(
    productId: number,
    currencyId: number,
    fromYear: number,
    toYear: number
  ): Observable<AvgCostProductI[]> {
    const params = new HttpParams()
      .set('currencyId', currencyId)
      .set('fromYear', fromYear.toString())
      .set('toYear', toYear.toString());
    return this.http.get<AvgCostProductI[]>(
      '/acquisition/avg-unit/cost/' + productId,
      {
        params,
      }
    );
  }

  getAvgTotalCostByAcquisition(
    productId: number,
    currencyId: number,
    fromYear: number,
    toYear: number
  ): Observable<AvgCostProductI[]> {
    const params = new HttpParams()
      .set('currencyId', currencyId)
      .set('fromYear', fromYear.toString())
      .set('toYear', toYear.toString());
    return this.http.get<AvgCostProductI[]>(
      '/acquisition/avg-total/cost/' + productId,
      {
        params,
      }
    );
  }

  findProductionByCostAndYear(
    currencyId: number,
    costType: string,
    minCost: number,
    maxCost: number,
    fromYear: number,
    toYear: number
  ): Observable<ProductionI[]> {
    const params = new HttpParams()
      .set('costType', costType)
      .set('minCost', minCost.toString())
      .set('maxCost', maxCost.toString())
      .set('fromYear', fromYear.toString())
      .set('toYear', toYear.toString());
    return this.http.get<ProductionI[]>('/production/cost/' + currencyId, {
      params,
    });
  }

  getAvgUnitProductionCost(
    productId: number,
    currencyId: number,
    fromYear: number,
    toYear: number
  ): Observable<AvgCostProductI[]> {
    const params = new HttpParams()
      .set('currencyId', currencyId)
      .set('fromYear', fromYear.toString())
      .set('toYear', toYear.toString());
    return this.http.get<AvgCostProductI[]>(
      '/production/avg-unit/cost/' + productId,
      {
        params,
      }
    );
  }

  getAvgTotalProductionCost(
    productId: number,
    currencyId: number,
    fromYear: number,
    toYear: number
  ): Observable<AvgCostProductI[]> {
    const params = new HttpParams()
      .set('currencyId', currencyId)
      .set('fromYear', fromYear.toString())
      .set('toYear', toYear.toString());
    return this.http.get<AvgCostProductI[]>(
      '/production/avg-total/cost/' + productId,
      {
        params,
      }
    );
  }
}
