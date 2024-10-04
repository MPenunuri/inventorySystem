import { Component } from '@angular/core';
import { InventoryProductI } from '../../../../models/product/inventory-product';
import { GetProductService } from '../../../../services/product/get-product.service';
import { ActivatedRoute } from '@angular/router';
import { CommonModule } from '@angular/common';
import { StockI } from '../../../../models/stock/stock';
import { SortArrayService } from '../../../../services/utils/sort-array.service';
import { EditableTextComponent } from '../../../commons/editable/editable-text/editable-text.component';
import { EditableTextAreaComponent } from '../../../commons/editable/editable-text-area/editable-text-area.component';
import { LocationsComponent } from './locations/locations.component';
import { SuppliersComponent } from './suppliers/suppliers.component';
import { SupplierI } from '../../../../models/supplier/supplier';
import { PatchProductService } from '../../../../services/product/patch-product.service';
import { EditableNavComponent } from '../../../commons/editable/editable-nav/editable-nav.component';
import { EditableNumberComponent } from '../../../commons/editable/editable-number/editable-number.component';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { AddMovementComponent } from './add-movement/add-movement.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [
    CommonModule,
    EditableTextComponent,
    EditableTextAreaComponent,
    EditableNumberComponent,
    EditableNavComponent,
    SuppliersComponent,
    AddSupplierComponent,
    AddMovementComponent,
    LocationsComponent,
  ],
  templateUrl: './product.component.html',
  styleUrl: './product.component.scss',
})
export class ProductComponent {
  productId?: number;
  currencyId?: number;
  product?: InventoryProductI;
  suppliers?: SupplierI[];
  stockList?: StockI[];
  refreshNotRelatedSuppliers = false;

  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';

  constructor(
    private getService: GetProductService,
    public patchService: PatchProductService,
    private route: ActivatedRoute,
    public sortService: SortArrayService
  ) {}

  ngOnInit() {
    const paramProductId = this.route.snapshot.paramMap.get('productId');
    const paramCurrencyId = this.route.snapshot.paramMap.get('currencyId');
    if (paramProductId) {
      this.productId = parseInt(paramProductId);
    }
    if (paramCurrencyId) {
      this.currencyId = parseInt(paramCurrencyId);
    }
    this.setProduct();
  }

  setProduct() {
    if (this.productId) {
      this.getService.getProductById(this.productId).subscribe({
        next: (data) => {
          this.product = data;
          this.stockList = data.stockList;
          this.suppliers = data.suppliers;
          this.refreshNotRelatedSuppliers = !this.refreshNotRelatedSuppliers;
        },
        error: () => {
          alert('Something went wrong.');
          this.refreshNotRelatedSuppliers = !this.refreshNotRelatedSuppliers;
        },
      });
    }
  }

  sortStockList(column: string) {
    if (this.stockList !== undefined) {
      this.stockList = this.sortService.sort(this.stockList, column);
    }
  }
}
