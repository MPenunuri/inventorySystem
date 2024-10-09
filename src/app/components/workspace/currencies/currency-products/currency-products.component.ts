import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';
import { GetProductService } from '../../../../services/product/get-product.service';
import { PatchProductService } from '../../../../services/product/patch-product.service';
import { SortArrayService } from '../../../../services/utils/sort-array.service';
import { SmallDeleteButtonComponent } from '../../../commons/button/small-delete-button/small-delete-button.component';
import { EditableNavComponent } from '../../../commons/editable/editable-nav/editable-nav.component';
import { EditableTextAreaComponent } from '../../../commons/editable/editable-text-area/editable-text-area.component';
import { EditableTextComponent } from '../../../commons/editable/editable-text/editable-text.component';
import { LoadingComponent } from '../../../commons/loading/loading.component';
import { AddLocationComponent } from '../../locations/add-location/add-location.component';
import { StandardProductI } from '../../../../models/product/standard-product';
import { EditableNumberComponent } from '../../../commons/editable/editable-number/editable-number.component';

@Component({
  selector: 'app-currency-products',
  standalone: true,
  imports: [
    CommonModule,
    SmallDeleteButtonComponent,
    AddLocationComponent,
    EditableTextComponent,
    EditableTextAreaComponent,
    EditableNumberComponent,
    EditableNavComponent,
    LoadingComponent,
  ],
  templateUrl: './currency-products.component.html',
  styleUrl: './currency-products.component.scss',
})
export class CurrencyProductsComponent {
  @Input() currencyId?: number;
  currencyName?: string;
  products?: StandardProductI[];
  filteredProducts?: StandardProductI[];
  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';

  filterSubject: Subject<string> = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private getService: GetProductService,
    public patchService: PatchProductService,
    public sortService: SortArrayService
  ) {
    this.filterSubject.pipe(debounceTime(500)).subscribe((filterText) => {
      this.applyFilter(filterText);
    });
  }

  setProducts() {
    if (this.currencyId) {
      this.getService.getProductsByPriceCurrency(this.currencyId).subscribe({
        next: (data: StandardProductI[]) => {
          this.products = data;
          this.filteredProducts = [...data];
          this.sort('productName');
        },
        error: () => {
          this.filteredProducts = [];
          this.products = [];
        },
      });
    }
  }

  ngOnInit(): void {
    const paramId = this.route.snapshot.paramMap.get('currencyId');
    const paramName = this.route.snapshot.paramMap.get('currencyName');
    if (paramId !== null) {
      this.currencyId = parseInt(paramId);
      this.setProducts();
    }
    if (paramName !== null) {
      this.currencyName = paramName;
    }
  }

  sort(column: keyof StandardProductI) {
    if (this.filteredProducts !== undefined) {
      this.filteredProducts = this.sortService.sort(
        this.filteredProducts,
        column
      );
    }
  }

  applyFilter(filterText: string) {
    if (this.products) {
      if (!filterText) {
        this.filteredProducts = [...this.products];
      } else {
        const regex = new RegExp(filterText, 'i');
        this.filteredProducts = this.products.filter((product) => {
          return (
            regex.test(product.productName) ||
            regex.test(product.subcategoryName) ||
            regex.test(product.productPresentation) ||
            regex.test(product.priceCurrency) ||
            regex.test(product.minimumStock.toString()) ||
            regex.test(product.totalStock.toString()) ||
            regex.test(product.retailPrice.toString()) ||
            regex.test(product.wholesalePrice.toString())
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
