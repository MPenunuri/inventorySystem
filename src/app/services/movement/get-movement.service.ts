import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { StandardMovementI } from '../../models/movement/standard-movement';
import { OutputI } from '../../models/movement/output/output';
import { EntryI } from '../../models/movement/entry/entry';
import { TransferI } from '../../models/movement/transfer/transfer';

@Injectable({
  providedIn: 'root',
})
export class GetMovementService {
  constructor(private http: HttpClient) {}

  getMovements(productId: number): Observable<StandardMovementI[]> {
    return this.http.get<StandardMovementI[]>(
      '/api/secure/movement/' + productId
    );
  }

  getMovementsOnLocation(locationId: number): Observable<StandardMovementI[]> {
    return this.http.get<StandardMovementI[]>(
      '/api/secure/movement/location/' + locationId
    );
  }

  getSupplierRelatedMovements(
    supplierId: number
  ): Observable<StandardMovementI[]> {
    return this.http.get<StandardMovementI[]>(
      '/api/secure/movement/supplier/' + supplierId
    );
  }

  getEntries(productId: number): Observable<EntryI[]> {
    return this.http.get<EntryI[]>('/api/secure/movement/entry/' + productId);
  }

  getOutputs(productId: number): Observable<OutputI[]> {
    return this.http.get<OutputI[]>('/api/secure/movement/output/' + productId);
  }

  getTransfers(productId: number): Observable<TransferI[]> {
    return this.http.get<TransferI[]>(
      '/api/secure/movement/transfer/' + productId
    );
  }
}
