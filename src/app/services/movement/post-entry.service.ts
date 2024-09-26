import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { MovementEntityI } from '../../models/movement/movement-entity';
import { CreateAcquisition } from '../../models/movement/entry/acquisition';
import { CreateCustomerReturn } from '../../models/movement/entry/customer-return';
import { CreateEntryAdjustment } from '../../models/movement/entry/entry-adjustment';
import { CreateProduction } from '../../models/movement/entry/production';

@Injectable({
  providedIn: 'root',
})
export class PostEntryService {
  constructor(private http: HttpClient) {}

  addAcquisition(
    productId: number,
    dateTime: Date,
    reason: string,
    comment: string,
    quantity: number,
    supplierId: number,
    toLocationId: number,
    costType: string,
    costValue: number,
    costCurrencyId: number
  ): Observable<MovementEntityI> {
    const acquisition = new CreateAcquisition(
      productId,
      dateTime,
      reason,
      comment,
      quantity,
      supplierId,
      toLocationId,
      costType,
      costValue,
      costCurrencyId
    );
    return this.http.post<MovementEntityI>(
      '/api/secure/movement/acquisition',
      acquisition.toObject()
    );
  }

  addCustomerReturn(
    productId: number,
    dateTime: Date,
    reason: string,
    comment: string,
    quantity: number,
    toLocationId: number,
    costType: string,
    costValue: number,
    costCurrencyId: number
  ): Observable<MovementEntityI> {
    const customerReturn = new CreateCustomerReturn(
      productId,
      dateTime,
      reason,
      comment,
      quantity,
      toLocationId,
      costType,
      costValue,
      costCurrencyId
    );
    return this.http.post<MovementEntityI>(
      '/api/secure/movement/customer-return',
      customerReturn.toObject()
    );
  }

  addEntryInventoryAdjustment(
    productId: number,
    dateTime: Date,
    reason: string,
    comment: string,
    quantity: number,
    toLocationId: number
  ): Observable<MovementEntityI> {
    const adjustment = new CreateEntryAdjustment(
      productId,
      dateTime,
      reason,
      comment,
      quantity,
      toLocationId
    );
    return this.http.post<MovementEntityI>(
      '/api/secure/movement/entry-adjusment',
      adjustment.toObject()
    );
  }

  addProduction(
    productId: number,
    dateTime: Date,
    reason: string,
    comment: string,
    quantity: number,
    toLocationId: number,
    costType: string,
    costValue: number,
    costCurrencyId: number
  ): Observable<MovementEntityI> {
    const production = new CreateProduction(
      productId,
      dateTime,
      reason,
      comment,
      quantity,
      toLocationId,
      costType,
      costValue,
      costCurrencyId
    );
    return this.http.post<MovementEntityI>(
      '/api/secure/movement/production',
      production.toObject()
    );
  }
}
