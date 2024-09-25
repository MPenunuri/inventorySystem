import { MovementCreate } from '../movement-create';
import { OutputI } from './output';

export interface InternalConsumptionI extends OutputI {}

export class CreateInternalConsumption extends MovementCreate {
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
