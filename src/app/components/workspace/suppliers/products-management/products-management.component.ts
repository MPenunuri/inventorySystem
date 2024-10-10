import { Component } from '@angular/core';
import { GetProductService } from '../../../../services/product/get-product.service';
import { ActivatedRoute } from '@angular/router';
import { SortArrayService } from '../../../../services/utils/sort-array.service';
import { CommonModule } from '@angular/common';
import { SmallDeleteButtonComponent } from '../../../commons/button/small-delete-button/small-delete-button.component';
import { EditableTextComponent } from '../../../commons/editable/editable-text/editable-text.component';
import { PatchProductService } from '../../../../services/product/patch-product.service';
import { SupplierService } from '../../../../services/supplier/supplier.service';
import { AddProductRelationComponent } from './add-product-relation/add-product-relation.component';
import { SupplierProductI } from '../../../../models/product/supplier-product';
import { EditableNavComponent } from '../../../commons/editable/editable-nav/editable-nav.component';
import { EditableTextAreaComponent } from '../../../commons/editable/editable-text-area/editable-text-area.component';
import { LoadingComponent } from '../../../commons/loading/loading.component';

@Component({
  selector: 'app-products-management',
  standalone: true,
  imports: [
    CommonModule,
    AddProductRelationComponent,
    SmallDeleteButtonComponent,
    EditableTextComponent,
    EditableNavComponent,
    EditableTextAreaComponent,
    LoadingComponent,
  ],
  templateUrl: './products-management.component.html',
  styleUrl: './products-management.component.scss',
})
export class ProductsManagementComponent {
  supplierId?: number;
  supplierName?: string;
  relatedProducts?: SupplierProductI[];
  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';
  refreshNotRelatedProducts = false;

  constructor(
    private route: ActivatedRoute,
    private getService: GetProductService,
    public patchService: PatchProductService,
    public deleteService: SupplierService,
    public sortService: SortArrayService
  ) {}

  setRelatedProducts() {
    if (this.supplierId) {
      this.getService.getProductsBySupplierId(this.supplierId).subscribe({
        next: (data) => {
          this.relatedProducts = data;
          this.refreshNotRelatedProducts = !this.refreshNotRelatedProducts;
        },
        error: () => {
          this.relatedProducts = [];
          this.refreshNotRelatedProducts = !this.refreshNotRelatedProducts;
        },
      });
    }
  }

  ngOnInit(): void {
    const paramSupplierId = this.route.snapshot.paramMap.get('supplierId');
    const paramSupplierName = this.route.snapshot.paramMap.get('supplierName');
    if (paramSupplierId !== null) {
      this.supplierId = parseInt(paramSupplierId);
      this.setRelatedProducts();

      this.sort('productName');
    }
    if (paramSupplierName !== null) {
      this.supplierName = paramSupplierName;
    }
  }

  sort(column: keyof SupplierProductI) {
    if (this.relatedProducts !== undefined) {
      this.relatedProducts = this.sortService.sort(
        this.relatedProducts,
        column
      );
    }
  }
}
