import { Component } from '@angular/core';
import { AddSupplierComponent } from './add-supplier/add-supplier.component';
import { CommonModule } from '@angular/common';
import { SupplierService } from '../../../services/supplier/supplier.service';
import { SortArrayService } from '../../../services/utils/sort-array.service';
import { SmallDeleteButtonComponent } from '../../commons/button/small-delete-button/small-delete-button.component';
import { EditableTextComponent } from '../../commons/editable/editable-text/editable-text.component';
import { FullSupplierI } from '../../../models/supplier/fullSupplier';
import { EditableNavComponent } from '../../commons/editable/editable-nav/editable-nav.component';
import { LoadingComponent } from '../../commons/loading/loading.component';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-suppliers',
  standalone: true,
  imports: [
    CommonModule,
    SmallDeleteButtonComponent,
    AddSupplierComponent,
    EditableTextComponent,
    EditableNavComponent,
    LoadingComponent,
  ],
  templateUrl: './suppliers.component.html',
  styleUrl: './suppliers.component.scss',
})
export class SuppliersComponent {
  suppliers?: FullSupplierI[];
  filteredSuppliers?: FullSupplierI[];
  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';

  filterSubject: Subject<string> = new Subject<string>();

  constructor(
    public service: SupplierService,
    public sortService: SortArrayService
  ) {
    this.filterSubject.pipe(debounceTime(500)).subscribe((filterText) => {
      this.applyFilter(filterText);
    });
  }

  setSuppliers() {
    this.service.getSuppliers().subscribe({
      next: (data) => {
        this.suppliers = data;
        this.filteredSuppliers = data;
        this.sort('supplierName');
      },
      error: () => {
        this.suppliers = [];
        this.filteredSuppliers = [];
      },
    });
  }

  ngOnInit(): void {
    this.setSuppliers();
  }

  sort(column: keyof FullSupplierI) {
    if (this.filteredSuppliers !== undefined) {
      this.filteredSuppliers = this.sortService.sort(
        this.filteredSuppliers,
        column
      );
    }
  }

  applyFilter(filterText: string) {
    if (this.suppliers) {
      if (!filterText) {
        this.filteredSuppliers = [...this.suppliers];
      } else {
        const regex = new RegExp(filterText, 'i');
        this.filteredSuppliers = this.suppliers.filter((i) => {
          return (
            regex.test(i.supplierName) ||
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
