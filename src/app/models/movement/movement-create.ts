export interface MovementCreateI {
  productId: number;
  dateTime: Date;
  reason: string;
  comment: string;
  quantity: number;
  supplierId?: number;
  fromLocationId?: number;
  toLocationId?: number;
  transactionSubtype?: string;
  transactionValue?: number;
  transactionCurrencyId?: number;
}

export class MovementCreate implements MovementCreateI {
  private _productId: number;
  private _dateTime: Date;
  private _reason: string;
  private _comment: string;
  private _quantity: number;
  private _supplierId?: number;
  private _fromLocationId?: number;
  private _toLocationId?: number;
  private _transactionSubtype?: string;
  private _transactionValue?: number;
  private _transactionCurrencyId?: number;

  constructor(
    productId: number,
    dateTime: Date,
    reason: string,
    comment: string,
    quantity: number,
    supplierId?: number,
    fromLocationId?: number,
    toLocationId?: number,
    transactionSubtype?: string,
    transactionValue?: number,
    transactionCurrencyId?: number
  ) {
    this._productId = productId;
    this._dateTime = dateTime;
    this._reason = reason;
    this._comment = comment;
    this._quantity = quantity;
    this._supplierId = supplierId;
    this._fromLocationId = fromLocationId;
    this._toLocationId = toLocationId;
    this._transactionSubtype = transactionSubtype;
    this._transactionValue = transactionValue;
    this._transactionCurrencyId = transactionCurrencyId;
  }

  toObject() {
    const obj: any = {
      productId: this._productId,
      dateTime: this._dateTime,
      reason: this._reason,
      comment: this._comment,
      quantity: this._quantity,
    };

    if (this._supplierId !== undefined) {
      obj.supplierId = this._supplierId;
    }

    if (this._fromLocationId !== undefined) {
      obj.fromLocationId = this._fromLocationId;
    }

    if (this._toLocationId !== undefined) {
      obj.toLocationId = this._toLocationId;
    }

    if (this._transactionSubtype !== undefined) {
      obj.transactionSubtype = this._transactionSubtype;
    }

    if (this._transactionValue !== undefined) {
      obj.transactionValue = this._transactionValue;
    }

    if (this._transactionCurrencyId !== undefined) {
      obj.transactionCurrencyId = this._transactionCurrencyId;
    }

    return obj;
  }

  get productId() {
    return this._productId;
  }

  get dateTime() {
    return this._dateTime;
  }

  get reason() {
    return this._reason;
  }

  get comment() {
    return this._comment;
  }

  get quantity() {
    return this._quantity;
  }

  get supplierId() {
    return this._supplierId;
  }

  get fromLocationId() {
    return this._fromLocationId;
  }

  get toLocationId() {
    return this._toLocationId;
  }

  get transactionSubtype() {
    return this._transactionSubtype;
  }

  get transactionValue() {
    return this._transactionValue;
  }

  get transactionCurrencyId() {
    return this._transactionCurrencyId;
  }
}
