import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ButtonComponent } from '../../../../../commons/button/button.component';
import { FormComponent } from '../../../../../commons/form/form.component';
import { SelectInputComponent } from '../../../../../commons/form/select-input/select-input.component';
import { ActivatedRoute, Router } from '@angular/router';
import { LocationService } from '../../../../../../services/location/location.service';
import { InputSanitizerService } from '../../../../../../services/input-sanitizer/input-sanitizer.service';
import { PostEntryService } from '../../../../../../services/movement/post-entry.service';
import { SelectOption } from '../../../../../../models/select-option/select-option';
import { DateInputComponent } from '../../../../../commons/form/date-input/date-input.component';
import { TextInputComponent } from '../../../../../commons/form/text-input/text-input.component';
import { TextAreaComponent } from '../../../../../commons/form/text-area/text-area.component';
import { NumberInputComponent } from '../../../../../commons/form/number-input/number-input.component';
import { SupplierService } from '../../../../../../services/supplier/supplier.service';
import { CurrencyService } from '../../../../../../services/currency/currency.service';
import { costTypes } from '../costTypes';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-acquisition',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormComponent,
    DateInputComponent,
    TextInputComponent,
    TextAreaComponent,
    NumberInputComponent,
    SelectInputComponent,
    ButtonComponent,
  ],
  templateUrl: './add-acquisition.component.html',
  styleUrl: './add-acquisition.component.scss',
})
export class AddAcquisitionComponent {
  productId?: number;
  productName?: string;
  locations: SelectOption[] = [];
  suppliers: SelectOption[] = [];
  currencies: SelectOption[] = [];
  form: FormGroup;
  costTypes = costTypes;

  constructor(
    private location: Location,
    private service: PostEntryService,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService,
    private supplierService: SupplierService,
    private currencyService: CurrencyService,
    private fb: FormBuilder,
    private sanitizer: InputSanitizerService
  ) {
    this.form = this.fb.group({
      dateTime: ['', [Validators.required], []],
      reason: ['', [Validators.required, Validators.maxLength(300)], []],
      comment: ['', [Validators.required], []],
      quantity: ['', [Validators.required], []],
      supplierId: ['', [Validators.required], []],
      toLocationId: ['', [Validators.required], []],
      transactionSubtype: ['', [Validators.required], []],
      transactionValue: ['', [Validators.required], []],
      transactionCurrencyId: ['', [Validators.required], []],
    });
  }

  ngOnInit() {
    const paramProductId = this.route.snapshot.paramMap.get('productId');
    const paramProductName = this.route.snapshot.paramMap.get('productName');
    if (paramProductId) {
      this.productId = parseInt(paramProductId);
    }
    if (paramProductName) {
      this.productName = paramProductName;
    }
    this.setLocations();
    this.setSuppliers();
    this.setCurrencies();
  }

  onSubmit() {
    let dateTime = this.form.value.dateTime;
    const reason = this.sanitizer.sanitize(this.form.value.reason);
    const comment = this.sanitizer.sanitize(this.form.value.comment);
    const quantity = this.form.value.quantity;
    const supplierId = this.form.value.supplierId;
    const toLocationId = this.form.value.toLocationId;
    const transactionSubtype = this.form.value.transactionSubtype;
    const transactionValue = this.form.value.transactionValue;
    const transactionCurrencyId = this.form.value.transactionCurrencyId;

    if (dateTime) {
      const localDate = new Date(dateTime);
      dateTime = localDate.toISOString();
    }
    if (supplierId === '') {
      return alert('Select a supplier');
    }
    if (toLocationId === '') {
      return alert('Select a location');
    }
    if (transactionSubtype === '') {
      return alert('Select cost type');
    }
    if (transactionCurrencyId === '') {
      return alert('Select a currency');
    }

    if (this.productId) {
      this.service
        .addAcquisition(
          this.productId,
          dateTime,
          reason,
          comment,
          quantity,
          supplierId,
          toLocationId,
          transactionSubtype,
          transactionValue,
          transactionCurrencyId
        )
        .subscribe({
          next: (entity) => {
            this.form.reset();
            this.location.back();
          },
          error: (error: HttpErrorResponse) => {
            if (
              error.status === 400 &&
              error.error.error ===
                'Cannot increase quantity beyond the maximum storage limit.'
            ) {
              return alert(
                'Cannot increase quantity quantity in stock beyond the maximum storage limit.'
              );
            }
            return alert(
              'An error occurred during registry. Please try again.'
            );
          },
        });
    }
  }

  setLocations() {
    this.locationService.getLocations().subscribe({
      next: (data) => {
        this.locations = data.map((l) => {
          return { id: l.locationId, name: l.locationName };
        });
      },
      error: () => {
        alert('No location to assign. Register one and come back.');
        this.router.navigate(['workspace/locations']);
      },
    });
  }

  setSuppliers() {
    if (this.productId) {
      this.supplierService
        .getSuppliersWithProductRelation(this.productId)
        .subscribe({
          next: (data) => {
            this.suppliers = data;
          },
          error: () => {
            alert('No supplier to assign. Register one and come back.');
            this.router.navigate(['workspace/suppliers']);
          },
        });
    }
  }

  setCurrencies() {
    this.currencyService.getCurrencies().subscribe({
      next: (data) => {
        this.currencies = data.map((c) => {
          return { id: c.currencyId, name: c.currencyName };
        });
      },
      error: () => {
        alert('No currency to assign. Register one and come back.');
        this.router.navigate(['workspace/currencies']);
      },
    });
  }
}
