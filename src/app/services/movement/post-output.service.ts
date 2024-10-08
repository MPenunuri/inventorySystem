import { Injectable } from '@angular/core';
import { MovementEntityI } from '../../models/movement/movement-entity';
import { Observable } from 'rxjs';
import { CreateSale } from '../../models/movement/output/sale';
import { HttpClient } from '@angular/common/http';
import { CreateSupplierReturn } from '../../models/movement/output/supplier-return';
import { CreateOutputAdjustment } from '../../models/movement/output/output-adjustment';
import { CreateInternalConsumption } from '../../models/movement/output/internal-consumption';

@Injectable({
  providedIn: 'root',
})
export class PostOutputService {
  constructor(private http: HttpClient) {}

  addSalesOutput(
    productId: number,
    dateTime: Date,
    reason: string,
    comment: string,
    quantity: number,
    fromLocationId: number,
    sellType: string
  ): Observable<MovementEntityI> {
    const sale = new CreateSale(
      productId,
      dateTime,
      reason,
      comment,
      quantity,
      fromLocationId,
      sellType
    );
    return this.http.post<MovementEntityI>(
      '/api/secure/movement/sale',
      sale.toObject()
    );
  }

  addSupplierReturn(
    productId: number,
    dateTime: Date,
    reason: string,
    comment: string,
    quantity: number,
    supplierId: number,
    fromLocationId: number,
    sellType: string,
    sell: number,
    sellCurrencyId: number
  ): Observable<MovementEntityI> {
    const supplierReturn = new CreateSupplierReturn(
      productId,
      dateTime,
      reason,
      comment,
      quantity,
      supplierId,
      fromLocationId,
      sellType,
      sell,
      sellCurrencyId
    );
    return this.http.post<MovementEntityI>(
      '/api/secure/movement/supplier-return',
      supplierReturn.toObject()
    );
  }

  addOutputInventoryAdjustment(
    productId: number,
    dateTime: Date,
    reason: string,
    comment: string,
    quantity: number,
    fromLocationId: number
  ): Observable<MovementEntityI> {
    const adjustment = new CreateOutputAdjustment(
      productId,
      dateTime,
      reason,
      comment,
      quantity,
      fromLocationId
    );
    return this.http.post<MovementEntityI>(
      '/api/secure/movement/output-adjustment',
      adjustment.toObject()
    );
  }

  addInternalConsumption(
    productId: number,
    dateTime: Date,
    reason: string,
    comment: string,
    quantity: number,
    fromLocationId: number
  ): Observable<MovementEntityI> {
    const consumption = new CreateInternalConsumption(
      productId,
      dateTime,
      reason,
      comment,
      quantity,
      fromLocationId
    );
    return this.http.post<MovementEntityI>(
      '/api/secure/movement/internal-consumption',
      consumption.toObject()
    );
  }
}
