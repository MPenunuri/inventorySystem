import { MovementCreate } from '../movement-create';
import { EntryI } from './entry';

export interface AcquisitionI extends EntryI {
  supplierId: number;
  supplierName: string;
  costType: string;
  cost: number;
  costCurrency: string;
}

export class CreateAcquisition extends MovementCreate {
  constructor(
    productId: number,
    dateTime: Date,
    reason: string,
    comment: string,
    quantity: number,
    supplierId: number,
    toLocationId: number,
    transactionSubtype: string,
    transactionValue: number,
    transactionCurrencyId: number,
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
}
