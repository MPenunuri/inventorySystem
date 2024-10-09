import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

@Component({
  selector: 'app-category-products',
  standalone: true,
  imports: [
    CommonModule,
    EditableNavComponent,
    EditableTextComponent,
    EditableNumberComponent,
    EditableTextAreaComponent,
    LoadingComponent,
  ],
  templateUrl: './category-products.component.html',
  styleUrl: './category-products.component.scss',
})
export class CategoryProductsComponent {
  @Input() categoryId?: number;
  categoryName?: string;
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
    if (this.categoryId) {
      this.getService.getProductsByCategoryId(this.categoryId).subscribe({
        next: (data: StandardProductI[]) => {
          this.products = data;
          this.filteredProducts = [...data];
          this.categoryName = data[0].categoryName;
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
    const paramCategoryId = this.route.snapshot.paramMap.get('categoryId');
    if (paramCategoryId !== null) {
      this.categoryId = parseInt(paramCategoryId);
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
            regex.test(product.categoryName) ||
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
