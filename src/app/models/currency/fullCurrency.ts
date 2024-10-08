export interface FullCurrencyI {
  currencyId: number;
  currencyName: string;
  products: number;
  movements: number;
}

export class FullCurrency implements FullCurrencyI {
  currencyId: number;
  currencyName: string;
  products: number;
  movements: number;

  constructor(
    currencyId: number,
    currencyName: string,
    products: number,
    movements: number
  ) {
    this.currencyId = currencyId;
    this.currencyName = currencyName;
    this.products = products;
    this.movements = movements;
  }
}
