import { Component } from '@angular/core';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { CommonModule } from '@angular/common';
import { SupplierService } from '../../../services/supplier/supplier.service';
import { SortArrayService } from '../../../services/utils/sort-array.service';
import { SmallDeleteButtonComponent } from '../../commons/button/small-delete-button/small-delete-button.component';
import { EditableTextComponent } from '../../commons/editable/editable-text/editable-text.component';
import { FullSupplierI } from '../../../models/supplier/fullSupplier';
import { EditableNavComponent } from '../../commons/editable/editable-nav/editable-nav.component';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [
    CommonModule,
    SmallDeleteButtonComponent,
    AddSupplierComponent,
    EditableTextComponent,
    EditableNavComponent,
  ],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.scss',
})
export class SuppliersComponent {
  suppliers?: FullSupplierI[];
  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';

  constructor(
    public service: SupplierService,
    public sortService: SortArrayService
  ) {}

  setSuppliers() {
    this.service.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers = data;
        this.sort('supplierName');
      },
      error: () => {
        this.suppliers = undefined;
      },
    });
  }

  ngOnInit(): void {
    this.setSuppliers();
  }

  sort(column: keyof FullSupplierI) {
    if (this.suppliers !== undefined) {
      this.suppliers = this.sortService.sort(this.suppliers, column);
    }
  }
}
