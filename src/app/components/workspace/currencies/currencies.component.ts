import { Component } from '@angular/core';
import { AddCurrencyComponent } from './add-currency/add-currency.component';
import { SortArrayService } from '../../../services/utils/sort-array.service';
import { CurrencyService } from '../../../services/currency/currency.service';
import { CommonModule } from '@angular/common';
import { SmallDeleteButtonComponent } from '../../commons/button/small-delete-button/small-delete-button.component';
import { FullCurrencyI } from '../../../models/currency/fullCurrency';

@Component({
  selector: 'app-currencies',
  standalone: true,
  imports: [CommonModule, AddCurrencyComponent, SmallDeleteButtonComponent],
  templateUrl: './currencies.component.html',
  styleUrl: './currencies.component.scss',
})
export class CurrenciesComponent {
  currencies?: FullCurrencyI[];
  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';

  constructor(
    public service: CurrencyService,
    public sortService: SortArrayService
  ) {}

  setCurrencies() {
    this.service.getCurrencies().subscribe({
      next: (data) => {
        this.currencies = data;
        this.sort('currencyName');
      },
      error: () => {
        this.currencies = undefined;
      },
    });
  }

  ngOnInit(): void {
    this.setCurrencies();
  }

  sort(column: keyof FullCurrencyI) {
    if (this.currencies !== undefined) {
      this.currencies = this.sortService.sort(this.currencies, column);
    }
  }
}
