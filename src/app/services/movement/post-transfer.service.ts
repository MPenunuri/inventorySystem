import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateTransfer } from '../../models/movement/transfer/transfer';
import { Observable } from 'rxjs';
import { MovementEntityI } from '../../models/movement/movement-entity';

@Injectable({
  providedIn: 'root',
})
export class PostTransferService {
  constructor(private http: HttpClient) {}

  addTransfer(
    productId: number,
    dateTime: Date,
    reason: string,
    comment: string,
    quantity: number,
    fromLocationId: number,
    toLocationId: number
  ): Observable<MovementEntityI> {
    const transfer = new CreateTransfer(
      productId,
      dateTime,
      reason,
      comment,
      quantity,
      fromLocationId,
      toLocationId
    );
    return this.http.post<MovementEntityI>(
      '/api/secure/movement/transfer',
      transfer
    );
  }
}
