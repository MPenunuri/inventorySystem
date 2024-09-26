import { CreateEntityI } from '../create-entity';
import { SubcategoryUpdateI } from './subcategory-update';

export interface SubcategoryCreateI extends CreateEntityI<SubcategoryUpdateI> {}

export class SubcategoryCreate implements SubcategoryCreateI {
  private _id?: number;
  private _categoryId: number;
  private _name: string;

  constructor(categoryId: number, name: string) {
    this._id = undefined;
    this._categoryId = categoryId;
    this._name = name;
  }

  get id(): number | undefined {
    return this._id;
  }

  get categoryId(): number {
    return this._categoryId;
  }

  get name(): string {
    return this._name;
  }

  toObject() {
    return {
      categoryId: this._categoryId,
      name: this._name,
    };
  }
}
