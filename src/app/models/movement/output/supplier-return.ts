import { OutputI } from './output';

export interface SupplierReturnI extends OutputI {
  supplierId: number;
  supplierName: string;
  refundType: string;
  refund: number;
  refundCurrency: string;
}
