import { StandardMovementI } from '../standard-movement';

export interface EntryI extends StandardMovementI {
  toLocationId: number;
  toLocationName: string;
}
