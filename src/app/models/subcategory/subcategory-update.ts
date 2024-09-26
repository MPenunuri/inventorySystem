export interface SubcategoryUpdateI {
  id: number;
  categoryId?: number;
  name?: string;
}

export class SubcategoryUpdate implements SubcategoryUpdateI {
  private _id: number;
  private _categoryId?: number;
  private _name?: string;

  constructor(id: number, categoryId?: number, name?: string) {
    this._id = id;
    this._categoryId = categoryId;
    this._name = name;
  }

  get id(): number {
    return this._id;
  }

  get categoryId(): number | undefined {
    return this._categoryId;
  }

  get name(): string | undefined {
    return this._name;
  }

  toObject() {
    const obj: any = { id: this.id };
    if (this.categoryId !== undefined) {
      obj.categoryId = this.categoryId;
    }
    if (this.name !== undefined) {
      obj.name = this.name;
    }
    return obj;
  }
}
