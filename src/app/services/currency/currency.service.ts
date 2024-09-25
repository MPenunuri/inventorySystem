import { Injectable } from '@angular/core';
import { CreateEntityI } from '../../models/create-entity';
import {
  CurrencyI,
  CurrencyUpdate,
  NewCurrency,
} from '../../models/currency/currency';
import { HttpClient } from '@angular/common/http';
import { CurrencyEntityI } from '../../models/currency/currency-entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  private currencyUpdate?: CurrencyI;
  private newCurrency?: CreateEntityI<CurrencyI>;

  constructor(private http: HttpClient) {}

  setCurrencyUpdate(id: number, name: string) {
    this.currencyUpdate = new CurrencyUpdate(id, name);
  }

  setNewCurrency(name: string) {
    this.newCurrency = new NewCurrency(name);
  }

  registerCurrency(): Observable<CurrencyEntityI> {
    if (this.newCurrency == undefined) {
      throw new Error('Undefined currency data');
    }
    return this.http.post<CurrencyEntityI>(
      '/api/secure/currency',
      this.newCurrency
    );
  }

  getCurrencies(): Observable<CurrencyEntityI[]> {
    return this.http.get<CurrencyEntityI[]>('/api/secure/currency');
  }

  renameCurrency(): Observable<CurrencyEntityI> {
    if (this.currencyUpdate == undefined) {
      throw new Error('Undefined currency data');
    }
    return this.http.patch<CurrencyEntityI>(
      '/api/secure/currency',
      this.currencyUpdate
    );
  }

  deleteCurrency(id: number): Observable<void> {
    return this.http.delete<void>('/api/secure/currency/' + id);
  }
}
