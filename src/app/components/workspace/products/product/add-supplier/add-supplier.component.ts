import { Component, EventEmitter, Input, Output } from '@angular/core';
import { SupplierService } from '../../../../../services/supplier/supplier.service';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';
import { Subject, debounceTime } from 'rxjs';
import { InputSanitizerService } from '../../../../../services/input-sanitizer/input-sanitizer.service';
import { SortArrayService } from '../../../../../services/utils/sort-array.service';
import { SupplierEntityI } from '../../../../../models/supplier/supplier-entity';
import { SupplierI } from '../../../../../models/supplier/supplier';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../commons/button/button.component';
import { FormComponent } from '../../../../commons/form/form.component';

@Component({
  selector: 'app-add-supplier',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormComponent, ButtonComponent],
  templateUrl: './add-supplier.component.html',
  styleUrl: './add-supplier.component.scss',
})
export class AddSupplierComponent {
  @Input() productId?: number;
  @Input() refreshSuppliers?: boolean;
  form: FormGroup;
  open: boolean;
  notRelatedSuppliers?: SupplierEntityI[];
  filteredSuppliers?: SupplierEntityI[];
  @Output() saved: EventEmitter<void> = new EventEmitter();
  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';

  filterSubject: Subject<string> = new Subject<string>();

  constructor(
    private fb: FormBuilder,
    private service: SupplierService,
    private sanitizer: InputSanitizerService,
    public sortService: SortArrayService
  ) {
    this.open = false;
    this.form = this.fb.group({
      supplierId: ['', [Validators.required, Validators.maxLength(255)], []],
      filter: [''],
    });

    this.filterSubject.pipe(debounceTime(300)).subscribe((filterText) => {
      this.applyFilter(filterText);
    });
  }

  ngOnChanges() {
    if (this.refreshSuppliers) {
      this.setSuppliers();
    }
  }

  setSuppliers() {
    if (this.productId) {
      this.service.getSuppliersWithNoProductRelation(this.productId).subscribe({
        next: (data) => {
          this.notRelatedSuppliers = data;
          this.filteredSuppliers = [...data];
          this.sort('name');
        },
        error: () => {
          this.notRelatedSuppliers = undefined;
          this.filteredSuppliers = undefined;
        },
      });
    }
  }

  ngOnInit() {
    this.setSuppliers();
  }

  onSubmit() {
    const supplierId = this.sanitizer.sanitize(
      this.form.value.supplierId.toString()
    );
    if (this.productId && supplierId) {
      this.service
        .addProductSupplierRelation(this.productId, parseInt(supplierId))
        .subscribe({
          next: () => {
            this.saved.emit();
            this.open = !this.open;
            this.form.reset();
            this.setSuppliers();
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

  sort(column: keyof SupplierI) {
    if (this.filteredSuppliers !== undefined) {
      this.filteredSuppliers = this.sortService.sort(
        this.filteredSuppliers,
        column
      );
    }
  }

  applyFilter(filterText: string) {
    if (this.notRelatedSuppliers) {
      if (!filterText) {
        this.notRelatedSuppliers = [...this.notRelatedSuppliers];
      } else {
        const regex = new RegExp(filterText, 'i');
        this.notRelatedSuppliers = this.notRelatedSuppliers.filter((supplier) =>
          regex.test(supplier.name)
        );
      }
    }
  }

  onFilterChange(event: Event) {
    const input = event.target as HTMLInputElement;
    this.filterSubject.next(input.value);
  }
}
