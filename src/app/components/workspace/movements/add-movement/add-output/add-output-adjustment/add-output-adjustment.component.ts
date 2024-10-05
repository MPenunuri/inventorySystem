import { Component } from '@angular/core';
import { Location } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { SelectOption } from '../../../../../../models/select-option/select-option';
import { InputSanitizerService } from '../../../../../../services/input-sanitizer/input-sanitizer.service';
import { LocationService } from '../../../../../../services/location/location.service';
import { PostOutputService } from '../../../../../../services/movement/post-output.service';
import { ButtonComponent } from '../../../../../commons/button/button.component';
import { DateInputComponent } from '../../../../../commons/form/date-input/date-input.component';
import { FormComponent } from '../../../../../commons/form/form.component';
import { NumberInputComponent } from '../../../../../commons/form/number-input/number-input.component';
import { SelectInputComponent } from '../../../../../commons/form/select-input/select-input.component';
import { TextAreaComponent } from '../../../../../commons/form/text-area/text-area.component';
import { TextInputComponent } from '../../../../../commons/form/text-input/text-input.component';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-add-output-adjustment',
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
  templateUrl: './add-output-adjustment.component.html',
  styleUrl: './add-output-adjustment.component.scss',
})
export class AddOutputAdjustmentComponent {
  productId?: number;
  productName?: string;
  locations: SelectOption[] = [];
  form: FormGroup;

  constructor(
    private location: Location,
    private service: PostOutputService,
    private route: ActivatedRoute,
    private router: Router,
    private locationService: LocationService,
    private fb: FormBuilder,
    private sanitizer: InputSanitizerService
  ) {
    this.form = this.fb.group({
      dateTime: ['', [Validators.required], []],
      reason: ['', [Validators.required, Validators.maxLength(300)], []],
      comment: ['', [Validators.required], []],
      quantity: ['', [Validators.required], []],
      fromLocationId: ['', [Validators.required], []],
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
  }

  onSubmit() {
    let dateTime = this.form.value.dateTime;
    const reason = this.sanitizer.sanitize(this.form.value.reason);
    const comment = this.sanitizer.sanitize(this.form.value.comment);
    const quantity = this.form.value.quantity;
    const fromLocationId = this.form.value.fromLocationId;

    if (dateTime) {
      const localDate = new Date(dateTime);
      dateTime = localDate.toISOString();
    }
    if (fromLocationId === '') {
      return alert('Select a location');
    }

    if (this.productId) {
      this.service
        .addOutputInventoryAdjustment(
          this.productId,
          dateTime,
          reason,
          comment,
          quantity,
          fromLocationId
        )
        .subscribe({
          next: (entity) => {
            this.form.reset();
            this.location.back();
          },
          error: (error: HttpErrorResponse) => {
            if (
              error.status === 400 &&
              error.error.error === 'Cannot decrease quantity below zero.'
            ) {
              return alert('Cannot decrease quantity in stock below zero.');
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
}
