import { MovementCreate } from '../movement-create';
import { EntryI } from './entry';

export interface EntryAdjustmentI extends EntryI {}

export class CreateEntryAdjustment extends MovementCreate {
  constructor(
    productId: number,
    dateTime: Date,
    reason: string,
    comment: string,
    quantity: number,
    toLocationId: number,
    transactionSubtype = undefined,
    transactionValue = undefined,
    transactionCurrencyId = undefined,
    supplierId = undefined,
    fromLocationId = undefined
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

  override toObject() {
    return super.toObject();
  }
}
