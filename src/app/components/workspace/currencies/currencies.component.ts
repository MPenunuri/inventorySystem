import { Component } from '@angular/core';
import { AddCurrencyComponent } from './add-currency/add-currency.component';
import { SortArrayService } from '../../../services/utils/sort-array.service';
import { CurrencyService } from '../../../services/currency/currency.service';
import { CommonModule } from '@angular/common';
import { SmallDeleteButtonComponent } from '../../commons/button/small-delete-button/small-delete-button.component';
import { FullCurrencyI } from '../../../models/currency/fullCurrency';
import { LoadingComponent } from '../../commons/loading/loading.component';
import { EditableNavComponent } from '../../commons/editable/editable-nav/editable-nav.component';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-currencies',
  standalone: true,
  imports: [
    CommonModule,
    AddCurrencyComponent,
    SmallDeleteButtonComponent,
    EditableNavComponent,
    LoadingComponent,
  ],
  templateUrl: './currencies.component.html',
  styleUrl: './currencies.component.scss',
})
export class CurrenciesComponent {
  currencies?: FullCurrencyI[];
  filteredCurrencies?: FullCurrencyI[];
  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';

  filterSubject: Subject<string> = new Subject<string>();

  constructor(
    public service: CurrencyService,
    public sortService: SortArrayService
  ) {
    this.filterSubject.pipe(debounceTime(500)).subscribe((filterText) => {
      this.applyFilter(filterText);
    });
  }

  setCurrencies() {
    this.service.getCurrencies().subscribe({
      next: (data) => {
        this.currencies = data;
        this.filteredCurrencies = data;
        this.sort('currencyName');
      },
      error: () => {
        this.currencies = [];
        this.currencies = [];
      },
    });
  }

  ngOnInit(): void {
    this.setCurrencies();
  }

  sort(column: keyof FullCurrencyI) {
    if (this.filteredCurrencies !== undefined) {
      this.filteredCurrencies = this.sortService.sort(
        this.filteredCurrencies,
        column
      );
    }
  }

  applyFilter(filterText: string) {
    if (this.currencies) {
      if (!filterText) {
        this.filteredCurrencies = [...this.currencies];
      } else {
        const regex = new RegExp(filterText, 'i');
        this.filteredCurrencies = this.currencies.filter((i) => {
          return (
            regex.test(i.currencyName) ||
            regex.test(i.products.toString()) ||
            regex.test(i.movements.toString())
          );
        });
      }
    }
  }

  onFilterChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterSubject.next(input.value);
  }
}
