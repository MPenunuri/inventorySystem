import { StandardProductI } from './standard-product';

export interface LocationProduct extends StandardProductI {
  stockLocationId: number;
  stockLocationName: string;
  stockLocationAddress: string;
  stockLocationQuantity: number;
  stockLocationMaximumStorage: number;
}
