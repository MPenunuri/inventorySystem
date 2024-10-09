import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Subject, debounceTime } from 'rxjs';
import { StandardProductI } from '../../../../models/product/standard-product';
import { GetProductService } from '../../../../services/product/get-product.service';
import { PatchProductService } from '../../../../services/product/patch-product.service';
import { SortArrayService } from '../../../../services/utils/sort-array.service';
import { EditableNavComponent } from '../../../commons/editable/editable-nav/editable-nav.component';
import { EditableNumberComponent } from '../../../commons/editable/editable-number/editable-number.component';
import { EditableTextAreaComponent } from '../../../commons/editable/editable-text-area/editable-text-area.component';
import { EditableTextComponent } from '../../../commons/editable/editable-text/editable-text.component';
import { LoadingComponent } from '../../../commons/loading/loading.component';
import { AddProductComponent } from '../../products/add-product/add-product.component';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-subcategory-products',
  standalone: true,
  imports: [
    CommonModule,
    EditableNavComponent,
    EditableTextComponent,
    EditableNumberComponent,
    EditableTextAreaComponent,
    LoadingComponent,
  ],
  templateUrl: './subcategory-products.component.html',
  styleUrl: './subcategory-products.component.scss',
})
export class SubcategoryProductsComponent {
  @Input() subcategoryId?: number;
  subcategoryName?: string;
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
    if (this.subcategoryId) {
      this.getService.getProductsBySubcategoryId(this.subcategoryId).subscribe({
        next: (data: StandardProductI[]) => {
          this.products = data;
          this.filteredProducts = [...data];
          this.subcategoryName = data[0].subcategoryName;
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
    const paramSubcategoryId =
      this.route.snapshot.paramMap.get('subcategoryId');
    if (paramSubcategoryId !== null) {
      this.subcategoryId = parseInt(paramSubcategoryId);
      this.setProducts();
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
