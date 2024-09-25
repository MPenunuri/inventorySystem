import { CreateEntityI } from '../create-entity';

export interface CurrencyI {
  id: number;
  name: string;
}

export class NewCurrency implements CreateEntityI<CurrencyI> {
  private _id?: number;
  private _name: string;

  constructor(name: string) {
    this._id = undefined;
    this._name = name;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }
}

export class CurrencyUpdate implements CurrencyI {
  private _id: number;
  private _name: string;

  constructor(id: number, name: string) {
    this._id = id;
    this._name = name;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._name;
  }
}
