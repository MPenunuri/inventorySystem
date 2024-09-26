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

  toObject() {
    const obj: any = { name: this._name };
    if (this._address !== undefined) {
      obj.address = this._address;
    }
    return obj;
  }
}

export class LocationUpdate implements LocationI {
  private _id: number;
  private _name?: string;
  private _address?: string;

  constructor(id: number) {
    this._id = id;
  }

  get id() {
    return this._id;
  }

  get name() {
    if (this._name === undefined) {
      return '';
    }
    return this._name;
  }

  set name(name: string) {
    this._name = name;
  }

  get address(): string | undefined {
    return this._address;
  }

  set address(address: string) {
    this._address = address;
  }

  toObject() {
    const obj: any = { id: this._id };
    if (this._name !== undefined) {
      obj.name = this._name;
    }
    if (this._address !== undefined) {
      obj.address = this._address;
    }
    return obj;
  }
}
