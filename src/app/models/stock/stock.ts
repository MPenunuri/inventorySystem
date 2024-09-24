import { LocationI } from '../location/location';

export interface StockI {
  id: number;
  location: LocationI;
  quantity: number;
  maximumStorage: number;
}
