import { Component } from '@angular/core';
import { SaleI } from '../../../../../../models/movement/output/sale';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { DeleteMovementService } from '../../../../../../services/movement/delete-movement.service';
import { GetOutputService } from '../../../../../../services/movement/get-output.service';
import { SortArrayService } from '../../../../../../services/utils/sort-array.service';
import { ButtonComponent } from '../../../../../commons/button/button.component';
import { SmallDeleteButtonComponent } from '../../../../../commons/button/small-delete-button/small-delete-button.component';
import { LoadingComponent } from '../../../../../commons/loading/loading.component';

@Component({
  selector: 'app-sales',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    SmallDeleteButtonComponent,
    ButtonComponent,
  ],
  templateUrl: './sales.component.html',
  styleUrl: './sales.component.scss',
})
export class SalesComponent {
  productId?: number;
  productName?: string;
  movements?: SaleI[];
  addUrl?: string;
  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: GetOutputService,
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
        '/workspace/movement/add-sale/' +
        this.productId +
        '/' +
        this.productName;
    }
  }

  setMovements() {
    if (this.productId) {
      this.service.getSales(this.productId).subscribe({
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

  sort(column: keyof SaleI) {
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
