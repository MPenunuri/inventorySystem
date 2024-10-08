import { Component } from '@angular/core';
import { OutputI } from '../../../../../models/movement/output/output';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { DeleteMovementService } from '../../../../../services/movement/delete-movement.service';
import { GetMovementService } from '../../../../../services/movement/get-movement.service';
import { SortArrayService } from '../../../../../services/utils/sort-array.service';
import { SmallDeleteButtonComponent } from '../../../../commons/button/small-delete-button/small-delete-button.component';
import { EditableNavComponent } from '../../../../commons/editable/editable-nav/editable-nav.component';
import { LoadingComponent } from '../../../../commons/loading/loading.component';

@Component({
  selector: 'app-outputs',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    SmallDeleteButtonComponent,
    EditableNavComponent,
  ],
  templateUrl: './outputs.component.html',
  styleUrl: './outputs.component.scss',
})
export class OutputsComponent {
  productId?: number;
  productName?: string;
  movements?: OutputI[];
  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: GetMovementService,
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
    }
  }

  setMovements() {
    if (this.productId) {
      this.service.getOutputs(this.productId).subscribe({
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

  sort(column: keyof OutputI) {
    if (this.movements !== undefined) {
      this.movements = this.sortService.sort(this.movements, column);
    }
  }

  getEditTypeRoute(type: string) {
    let route = 'workspace/movement/product/';
    switch (type) {
      case 'Entry':
        route += 'entries';
        break;
      case 'Output':
        route += 'outputs';
        break;
      case 'Transfer':
        route += 'transfers';
        break;
    }
    return route + '/' + this.productId + '/' + this.productName;
  }

  getEditSubtypeRoute(type: string, subtype: string) {
    let route = 'workspace/movement/product/';
    switch (subtype) {
      case 'Acquisition':
        route += 'acquisitions';
        break;
      case 'Customer return':
        route += 'customer-returns';
        break;
      case 'Production':
        route += 'productions';
        break;
      case 'Sales':
        route += 'sales';
        break;
      case 'Supplier Return':
        route += 'supplier-returns';
        break;
      case 'Internal Consumption':
        route += 'internal-consumptions';
        break;
      case 'Inventory adjustment':
        route += type === 'Entry' ? 'entry-adjustments' : 'output-adjustments';
        break;
    }
    return route + '/' + this.productId + '/' + this.productName;
  }
}
