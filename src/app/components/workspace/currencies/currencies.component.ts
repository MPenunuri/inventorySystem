import { Component, EventEmitter, Output } from '@angular/core';
import { AddCurrencyComponent } from './add-currency/add-currency.component';
import { CurrencyEntityI } from '../../../models/currency/currency-entity';
import { SortArrayService } from '../../../services/utils/sort-array.service';
import { CurrencyService } from '../../../services/currency/currency.service';
import { CommonModule } from '@angular/common';
import { EditableTextComponent } from '../../commons/editable/editable-text/editable-text.component';
import { SmallDeleteButtonComponent } from '../../commons/button/small-delete-button/small-delete-button.component';

@Component({
  selector: 'app-currencies',
  standalone: true,
  imports: [CommonModule, AddCurrencyComponent, SmallDeleteButtonComponent],
  templateUrl: './currencies.component.html',
  styleUrl: './currencies.component.scss',
})
export class CurrenciesComponent {
  currencies?: CurrencyEntityI[];
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
        this.sort('name');
      },
      error: () => {
        this.currencies = undefined;
      },
    });
  }

  ngOnInit(): void {
    this.setCurrencies();
  }

  sort(column: keyof CurrencyEntityI) {
    if (this.currencies !== undefined) {
      this.currencies = this.sortService.sort(this.currencies, column);
    }
  }
}
