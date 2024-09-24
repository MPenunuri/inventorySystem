import { EntryI } from './entry';

export interface AcquisitionI extends EntryI {
  supplierId: number;
  supplierName: string;
  costType: string;
  cost: number;
  costCurrency: string;
}
