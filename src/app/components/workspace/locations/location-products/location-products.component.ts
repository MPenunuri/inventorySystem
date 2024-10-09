import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';
import { GetProductService } from '../../../../services/product/get-product.service';
import { PatchProductService } from '../../../../services/product/patch-product.service';
import { SortArrayService } from '../../../../services/utils/sort-array.service';
import { EditableNavComponent } from '../../../commons/editable/editable-nav/editable-nav.component';
import { EditableNumberComponent } from '../../../commons/editable/editable-number/editable-number.component';
import { EditableTextAreaComponent } from '../../../commons/editable/editable-text-area/editable-text-area.component';
import { EditableTextComponent } from '../../../commons/editable/editable-text/editable-text.component';
import { LoadingComponent } from '../../../commons/loading/loading.component';
import { LocationProductI } from '../../../../models/product/location-product';
import { LocationService } from '../../../../services/location/location.service';

@Component({
  selector: 'app-location-products',
  standalone: true,
  imports: [
    CommonModule,
    EditableNavComponent,
    EditableTextComponent,
    EditableNumberComponent,
    EditableTextAreaComponent,
    LoadingComponent,
  ],
  templateUrl: './location-products.component.html',
  styleUrl: './location-products.component.scss',
})
export class LocationProductsComponent {
  @Input() locationId?: number;
  locationName?: string;
  products?: LocationProductI[];
  filteredProducts?: LocationProductI[];
  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';

  filterSubject: Subject<string> = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private getService: GetProductService,
    public patchService: PatchProductService,
    public locationService: LocationService,
    public sortService: SortArrayService
  ) {
    this.filterSubject.pipe(debounceTime(500)).subscribe((filterText) => {
      this.applyFilter(filterText);
    });
  }

  setProducts() {
    if (this.locationId) {
      this.getService.getProductsByLocationId(this.locationId).subscribe({
        next: (data: LocationProductI[]) => {
          this.products = data;
          this.filteredProducts = [...data];
          this.locationName = data[0].stockLocationName;
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
    const paramLocationId = this.route.snapshot.paramMap.get('locationId');
    if (paramLocationId !== null) {
      this.locationId = parseInt(paramLocationId);
      this.setProducts();
    }
  }

  sort(column: keyof LocationProductI) {
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
            regex.test(product.categoryName) ||
            regex.test(product.subcategoryName) ||
            regex.test(product.productPresentation) ||
            regex.test(product.priceCurrency) ||
            regex.test(product.minimumStock.toString()) ||
            regex.test(product.retailPrice.toString()) ||
            regex.test(product.wholesalePrice.toString()) ||
            regex.test(product.stockLocationQuantity.toString()) ||
            regex.test(product.stockLocationMaximumStorage.toString())
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
