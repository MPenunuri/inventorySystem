import { LocationI } from './location';

export interface LocationEntityI extends LocationI {
  user_id: number;
}

export class LocationEntity implements LocationEntityI {
  private _user_id: number;
  private _id: number;
  private _name: string;
  private _address?: string;

  constructor(userId: number, id: number, name: string, address?: string) {
    this._user_id = userId;
    this._id = id;
    this._name = name;
    this._address = address;
  }

  get user_id() {
    return this._user_id;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }

  get address() {
    return this._address;
  }
}
