import { MovementCreate } from '../movement-create';
import { OutputI } from './output';

export interface SupplierReturnI extends OutputI {
  supplierId: number;
  supplierName: string;
  refundType: string;
  refund: number;
  refundCurrency: string;
}

export class CreateSupplierReturn extends MovementCreate {
  constructor(
    productId: number,
    dateTime: Date,
    reason: string,
    comment: string,
    quantity: number,
    supplierId: number,
    fromLocationId: number,
    transactionSubtype: string,
    transactionValue: number,
    transactionCurrencyId: number,
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
