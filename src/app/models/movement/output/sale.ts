import { OutputI } from './output';

export interface SaleI extends OutputI {
  selltype: string;
  sell: number;
  sellCurrency: string;
}
