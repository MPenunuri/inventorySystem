import { CreateEntityI } from '../create-entity';
export interface LocationI {
  id: number;
  name: string;
  address?: string;
}

export class NewLocation implements CreateEntityI<LocationI> {
  private _id?: number;
  private _name: string;
  private _address?: string;

  constructor(name: string, address?: string) {
    this._id = undefined;
    this._name = name;
    this._address = address;
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

export class LocationUpdate implements LocationI {
  private _id: number;
  private _name: string;
  private _address?: string;

  constructor(id: number, name: string, address?: string) {
    this._id = id;
    this._name = name;
    this._address = address;
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
