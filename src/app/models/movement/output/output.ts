import { StandardMovementI } from '../standard-movement';

export interface OutputI extends StandardMovementI {
  fromLocationId: number;
  fromLocationName: string;
}
