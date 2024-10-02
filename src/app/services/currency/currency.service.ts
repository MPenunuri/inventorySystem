import { Injectable } from '@angular/core';
import { CreateEntityI } from '../../models/create-entity';
import { CurrencyUpdate, NewCurrency } from '../../models/currency/currency';
import { HttpClient } from '@angular/common/http';
import { CurrencyEntityI } from '../../models/currency/currency-entity';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CurrencyService {
  constructor(private http: HttpClient) {}

  registerCurrency(name: string): Observable<CurrencyEntityI> {
    const newCurrency = new NewCurrency(name);
    return this.http.post<CurrencyEntityI>(
      '/api/secure/currency',
      newCurrency.toObject()
    );
  }

  getCurrencies(): Observable<CurrencyEntityI[]> {
    return this.http.get<CurrencyEntityI[]>('/api/secure/currency');
  }

  renameCurrency(id: number, name: string): Observable<CurrencyEntityI> {
    const currencyUpdate = new CurrencyUpdate(id, name);
    return this.http.patch<CurrencyEntityI>(
      '/api/secure/currency',
      currencyUpdate.toObject()
    );
  }

  deleteCurrency(id: number): Observable<void> {
    return this.http.delete<void>('/api/secure/currency/' + id);
  }
}
