export interface ProductUpdateI {
  id: number;
  name?: string;
  subcategoryId?: number;
  productPresentation?: string;
  minimumStock?: number;
  retailPrice?: number;
  wholesalePrice?: number;
  priceCurrencyId?: number;
}

export class ProductUpdate implements ProductUpdateI {
  private _id: number;
  private _name?: string | undefined;
  private _subcategoryId?: number | undefined;
  private _productPresentation?: string | undefined;
  private _minimumStock?: number | undefined;
  private _retailPrice?: number | undefined;
  private _wholesalePrice?: number | undefined;
  private _priceCurrencyId?: number | undefined;

  constructor(id: number) {
    this._id = id;
  }

  get id(): number {
    return this._id;
  }

  get name(): string | undefined {
    return this._name;
  }

  set name(value: string) {
    this._name = value;
  }

  get subcategoryId(): number | undefined {
    return this._subcategoryId;
  }

  set subcategoryId(value: number) {
    this._subcategoryId = value;
  }

  get productPresentation(): string | undefined {
    return this._productPresentation;
  }

  set productPresentation(value: string) {
    this._productPresentation = value;
  }

  get minimumStock(): number | undefined {
    return this._minimumStock;
  }

  set minimumStock(value: number) {
    this._minimumStock = value;
  }

  get retailPrice(): number | undefined {
    return this._retailPrice;
  }

  set retailPrice(value: number) {
    this._retailPrice = value;
  }

  get wholesalePrice(): number | undefined {
    return this._wholesalePrice;
  }

  set wholesalePrice(value: number) {
    this._wholesalePrice = value;
  }

  get priceCurrencyId(): number | undefined {
    return this._priceCurrencyId;
  }

  set priceCurrencyId(value: number) {
    this._priceCurrencyId = value;
  }
}
