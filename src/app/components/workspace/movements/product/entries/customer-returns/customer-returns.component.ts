import { Component } from '@angular/core';
import { CustomerReturnI } from '../../../../../../models/movement/entry/customer-return';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { DeleteMovementService } from '../../../../../../services/movement/delete-movement.service';
import { GetEntryService } from '../../../../../../services/movement/get-entry.service';
import { SortArrayService } from '../../../../../../services/utils/sort-array.service';
import { ButtonComponent } from '../../../../../commons/button/button.component';
import { SmallDeleteButtonComponent } from '../../../../../commons/button/small-delete-button/small-delete-button.component';
import { LoadingComponent } from '../../../../../commons/loading/loading.component';

@Component({
  selector: 'app-customer-returns',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    SmallDeleteButtonComponent,
    ButtonComponent,
  ],
  templateUrl: './customer-returns.component.html',
  styleUrl: './customer-returns.component.scss',
})
export class CustomerReturnsComponent {
  productId?: number;
  productName?: string;
  movements?: CustomerReturnI[];
  addUrl?: string;
  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: GetEntryService,
    public deleteService: DeleteMovementService,
    public sortService: SortArrayService
  ) {}

  ngOnInit(): void {
    const paramProductId = this.route.snapshot.paramMap.get('productId');
    const paramProductName = this.route.snapshot.paramMap.get('productName');
    if (paramProductId !== null) {
      this.productId = parseInt(paramProductId);
    }
    if (paramProductName !== null) {
      this.productName = paramProductName;
    }
    if (this.productId && this.productName) {
      this.setMovements();
      this.addUrl =
        '/workspace/movement/add-customer-return/' +
        this.productId +
        '/' +
        this.productName;
    }
  }

  setMovements() {
    if (this.productId) {
      this.service.getCustomerReturns(this.productId).subscribe({
        next: (data) => {
          this.movements = data;
          this.sort('dateTime');
        },
        error: () => {
          this.movements = [];
        },
      });
    }
  }

  sort(column: keyof CustomerReturnI) {
    if (this.movements !== undefined) {
      this.movements = this.sortService.sort(this.movements, column);
    }
  }

  navigate(addUrl: string) {
    const outletContainer = document.getElementById('outletContainer');
    outletContainer?.classList.add('unstage');
    setTimeout(() => {
      this.router.navigate([addUrl]);
      outletContainer?.classList.remove('unstage');
    }, 510);
  }
}
