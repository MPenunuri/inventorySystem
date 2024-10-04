import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SupplierService } from '../../../../../services/supplier/supplier.service';
import { CommonModule } from '@angular/common';
import { SupplierI } from '../../../../../models/supplier/supplier';
import { SortArrayService } from '../../../../../services/utils/sort-array.service';
import { SmallDeleteButtonComponent } from '../../../../commons/button/small-delete-button/small-delete-button.component';
import { EditableTextComponent } from '../../../../commons/editable/editable-text/editable-text.component';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [CommonModule, EditableTextComponent, SmallDeleteButtonComponent],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.scss',
})
export class SuppliersComponent {
  @Input() productId?: number;
  @Input() suppliers?: SupplierI[];
  @Output() supplierRemoved: EventEmitter<void> = new EventEmitter();

  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';

  constructor(
    public service: SupplierService,
    public sortService: SortArrayService
  ) {}

  sort(column: keyof SupplierI) {
    if (this.suppliers !== undefined) {
      this.suppliers = this.sortService.sort(this.suppliers, column);
    }
  }

  supplierRemovedEmit() {
    this.supplierRemoved.emit();
  }
}
