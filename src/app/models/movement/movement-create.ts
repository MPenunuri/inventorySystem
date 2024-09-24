export interface MovementCreateI {
  productId: number;
  dateTime: Date;
  reason: string;
  comment: string;
  quantity: number;
  supplierId?: number;
  fromLocationId?: number;
  toLocationId?: number;
  transactionSubtype: string;
  transactionValue: string;
  transactionCurrencyId?: number;
}
