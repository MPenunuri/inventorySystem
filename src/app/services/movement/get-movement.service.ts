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

  getMovements(): Observable<StandardMovementI[]> {
    return this.http.get<StandardMovementI[]>('/api/secure/movement');
  }

  getEntries(): Observable<EntryI[]> {
    return this.http.get<EntryI[]>('/api/secure/movement/entry');
  }

  getOutputs(): Observable<OutputI[]> {
    return this.http.get<OutputI[]>('/api/secure/movement/output');
  }

  getTransfers(): Observable<TransferI[]> {
    return this.http.get<TransferI[]>('/api/secure/movement/transfer');
  }

  getMovementsByProductId(id: number): Observable<StandardMovementI[]> {
    return this.http.get<StandardMovementI[]>(
      '/api/secure/movement/product/' + id
    );
  }
}
