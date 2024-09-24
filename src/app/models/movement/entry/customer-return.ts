import { EntryI } from './entry';

export interface CustomerReturnI extends EntryI {
  costType: string;
  cost: number;
  costCurrency: string;
}
