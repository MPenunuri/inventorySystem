import { MovementCreate } from '../movement-create';
import { EntryI } from './entry';

export interface ProductionI extends EntryI {
  costType: string;
  cost: number;
  costCurrency: string;
}

export class CreateProduction extends MovementCreate {
  constructor(
    productId: number,
    dateTime: Date,
    reason: string,
    comment: string,
    quantity: number,
    toLocationId: number,
    transactionSubtype: string,
    transactionValue: number,
    transactionCurrencyId: number,
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
