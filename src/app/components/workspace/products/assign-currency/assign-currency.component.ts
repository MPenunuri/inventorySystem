import { Component, Input } from '@angular/core';
import { CurrencyEntityI } from '../../../../models/currency/currency-entity';
import { CurrencyService } from '../../../../services/currency/currency.service';
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { InputSanitizerService } from '../../../../services/input-sanitizer/input-sanitizer.service';
import { PatchProductService } from '../../../../services/product/patch-product.service';
import { ButtonComponent } from '../../../commons/button/button.component';
import { FormComponent } from '../../../commons/form/form.component';
import { SelectInputComponent } from '../../../commons/form/select-input/select-input.component';

@Component({
  selector: 'app-assign-currency',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    FormComponent,
    SelectInputComponent,
    ButtonComponent,
  ],
  templateUrl: './assign-currency.component.html',
  styleUrl: './assign-currency.component.scss',
})
export class AssignCurrencyComponent {
  form: FormGroup;
  private productId?: number;
  public productName?: string;
  public currentCurrencyId?: number;
  @Input() currencies: CurrencyEntityI[] = [];

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private fb: FormBuilder,
    private sanitizer: InputSanitizerService,
    private service: PatchProductService,
    private currencyService: CurrencyService
  ) {
    this.form = this.fb.group({
      currencyId: ['', [Validators.required], []],
    });
  }

  ngOnInit(): void {
    const paramProductId = this.route.snapshot.paramMap.get('productId');
    const paramProductName = this.route.snapshot.paramMap.get('productName');
    const paramCurrenctCurrencyId =
      this.route.snapshot.paramMap.get('currentCurrencyId');

    if (paramProductId !== null) {
      this.productId = parseInt(paramProductId);
    }
    if (paramProductName !== null) {
      this.productName = paramProductName;
    }

    this.currencyService.getCurrencies().subscribe({
      next: (data) => {
        this.currencies = data;
        if (paramCurrenctCurrencyId) {
          this.form.get('currencyId')?.setValue(paramCurrenctCurrencyId);
        }
      },
      error: () => {
        alert('No currencies to assign. Go to currencies and register one.');
      },
    });
  }

  onSubmit() {
    const currencyId = this.sanitizer.sanitize(this.form.value.currencyId);
    if (currencyId === '') {
      alert('Select a valid option');
    }
    if (this.productId && currencyId !== '') {
      this.service
        .updatePriceCurrency(this.productId, parseInt(currencyId))
        .subscribe({
          next: (entity) => {
            this.form.reset();
            this.router.navigate(['/workspace/products']);
          },
          error: (error) => {
            alert('An error occurred during registry. Please try again.');
          },
        });
    }
  }
}
