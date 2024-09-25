import { CurrencyI } from './currency';

export interface CurrencyEntityI extends CurrencyI {
  user_id: number;
}

export class CurrencyEntity implements CurrencyEntityI {
  private _user_id: number;
  private _id: number;
  private _name: string;

  constructor(userId: number, id: number, name: string) {
    this._user_id = userId;
    this._id = id;
    this._name = name;
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
}
