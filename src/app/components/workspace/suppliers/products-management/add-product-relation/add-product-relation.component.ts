import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GetProductService } from '../../../../../services/product/get-product.service';
import { SupplierService } from '../../../../../services/supplier/supplier.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { InputSanitizerService } from '../../../../../services/input-sanitizer/input-sanitizer.service';
import { NoSupplierProductI } from '../../../../../models/product/no-supplier-product';
import { SortArrayService } from '../../../../../services/utils/sort-array.service';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../commons/button/button.component';
import { FormComponent } from '../../../../commons/form/form.component';
import { EditableTextComponent } from '../../../../commons/editable/editable-text/editable-text.component';
import { PatchProductService } from '../../../../../services/product/patch-product.service';
import { EditableNavComponent } from '../../../../commons/editable/editable-nav/editable-nav.component';
import { EditableTextAreaComponent } from '../../../../commons/editable/editable-text-area/editable-text-area.component';

@Component({
  selector: 'app-add-product-relation',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormComponent,
    ButtonComponent,
    EditableTextComponent,
    EditableNavComponent,
    EditableTextAreaComponent,
  ],
  templateUrl: './add-product-relation.component.html',
  styleUrl: './add-product-relation.component.scss',
})
export class AddProductRelationComponent {
  @Input() supplierId?: number;
  @Input() refreshProducts?: boolean;
  form: FormGroup;
  open: boolean;
  notRelatedProducts?: NoSupplierProductI[];
  @Output() saved: EventEmitter<void> = new EventEmitter();
  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';

  constructor(
    private fb: FormBuilder,
    private getService: GetProductService,
    private postService: SupplierService,
    public patchService: PatchProductService,
    private sanitizer: InputSanitizerService,
    public sortService: SortArrayService
  ) {
    this.open = false;
    this.form = this.fb.group({
      productId: ['', [Validators.required, Validators.maxLength(255)], []],
    });
  }

  ngOnChanges() {
    if (this.refreshProducts) {
      this.setProducts();
    }
  }

  setProducts() {
    if (this.supplierId) {
      this.getService
        .getProductsWithNoSupplierRelation(this.supplierId)
        .subscribe({
          next: (data) => {
            this.notRelatedProducts = data;
            this.sort('productName');
          },
          error: () => {
            this.notRelatedProducts = undefined;
          },
        });
    }
  }

  ngOnInit() {
    this.setProducts();
  }

  onSubmit() {
    const productId = this.sanitizer.sanitize(
      this.form.value.productId.toString()
    );
    if (this.supplierId && productId) {
      this.postService
        .addProductSupplierRelation(parseInt(productId), this.supplierId)
        .subscribe({
          next: () => {
            this.saved.emit();
            this.open = !this.open;
            this.form.reset();
            this.setProducts();
          },
          error: (error) => {
            alert(
              'An error occurred during product supplier relation registry. Please try again.'
            );
          },
        });
    } else {
      alert('Select an option.');
    }
  }

  toggleOpen() {
    if (this.open) {
      const appForm = document.querySelector('app-form');
      if (appForm) {
        appForm.classList.add('fade-out');
        setTimeout(() => {
          this.open = false;
          appForm.classList.remove('fade-out');
        }, 500);
      }
    } else {
      this.open = true;
    }
  }

  sort(column: keyof NoSupplierProductI) {
    if (this.notRelatedProducts !== undefined) {
      this.notRelatedProducts = this.sortService.sort(
        this.notRelatedProducts,
        column
      );
    }
  }
}
