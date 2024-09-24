import { StandardProductI } from './standard-product';

export interface SupplierProductI extends StandardProductI {
  supplierId: number;
  supplierName: string;
}
