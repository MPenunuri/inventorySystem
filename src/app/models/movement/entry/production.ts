import { EntryI } from './entry';

export interface ProductionI extends EntryI {
  costType: string;
  cost: number;
  costCurrency: string;
}
