import { MovementCreate } from '../movement-create';
import { OutputI } from './output';

export interface SaleI extends OutputI {
  selltype: string;
  sell: number;
  sellCurrency: string;
}

export class CreateSale extends MovementCreate {
  constructor(
    productId: number,
    dateTime: Date,
    reason: string,
    comment: string,
    quantity: number,
    fromLocationId: number,
    transactionSubtype: string,
    transactionValue: number,
    transactionCurrencyId: number,
    supplierId = undefined,
    toLocationId = undefined
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
