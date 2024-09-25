import { StandardProductI } from './standard-product';

export interface LocationProductI extends StandardProductI {
  stockLocationId: number;
  stockLocationName: string;
  stockLocationAddress: string;
  stockLocationQuantity: number;
  stockLocationMaximumStorage: number;
}
