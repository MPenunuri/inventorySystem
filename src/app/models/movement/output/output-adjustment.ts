import { MovementCreate } from '../movement-create';
import { OutputI } from './output';

export interface OutputAdjustmentI extends OutputI {}

export class CreateOutputAdjustment extends MovementCreate {
  constructor(
    productId: number,
    dateTime: Date,
    reason: string,
    comment: string,
    quantity: number,
    fromLocationId: number,
    supplierId = undefined,
    transactionSubtype = undefined,
    transactionValue = undefined,
    transactionCurrencyId = undefined,
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
}
