import { CreateEntityI } from '../create-entity';

export interface CategoryI {
  id: number;
  name: string;
}

export class NewCategory implements CreateEntityI<CategoryI> {
  private _id?: number;
  private _name: string;

  constructor(name: string) {
    this._id = undefined;
    this._name = name;
  }

  get id(): number | undefined {
    return this._id;
  }

  get name(): string {
    return this._name;
  }
}

export class CategoryUpdate implements CategoryI {
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
