import { EntryI } from '../entry/entry';
import { MovementCreate } from '../movement-create';
import { OutputI } from '../output/output';

export interface TransferI extends EntryI, OutputI {}

export class CreateTransfer extends MovementCreate {
  constructor(
    productId: number,
    dateTime: Date,
    reason: string,
    comment: string,
    quantity: number,
    fromLocationId: number,
    toLocationId: number,
    transactionSubtype = undefined,
    transactionValue = undefined,
    transactionCurrencyId = undefined,
    supplierId = undefined
  ) {
    super(
      productId,
      dateTime,
      reason,
      comment,
      quantity,
      supplierId,
      fromLocationId,
      toLocationId,
      transactionSubtype,
      transactionValue,
      transactionCurrencyId
    );
  }
}
