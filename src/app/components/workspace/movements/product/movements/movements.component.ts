import { Component } from '@angular/core';
import { StandardMovementI } from '../../../../../models/movement/standard-movement';
import { CommonModule } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';
import { DeleteMovementService } from '../../../../../services/movement/delete-movement.service';
import { GetMovementService } from '../../../../../services/movement/get-movement.service';
import { SortArrayService } from '../../../../../services/utils/sort-array.service';
import { SmallDeleteButtonComponent } from '../../../../commons/button/small-delete-button/small-delete-button.component';
import { LoadingComponent } from '../../../../commons/loading/loading.component';
import { EditableNavComponent } from '../../../../commons/editable/editable-nav/editable-nav.component';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-movements',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    SmallDeleteButtonComponent,
    EditableNavComponent,
  ],
  templateUrl: './movements.component.html',
  styleUrl: './movements.component.scss',
})
export class MovementsComponent {
  productId?: number;
  productName?: string;
  movements?: StandardMovementI[];
  filteredMovements?: StandardMovementI[];
  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';

  filterSubject: Subject<string> = new Subject<string>();

  constructor(
    private route: ActivatedRoute,
    private service: GetMovementService,
    public deleteService: DeleteMovementService,
    public sortService: SortArrayService
  ) {
    this.filterSubject.pipe(debounceTime(500)).subscribe((filterText) => {
      this.applyFilter(filterText);
    });
  }

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
      this.service.getMovements(this.productId).subscribe({
        next: (data) => {
          this.movements = data;
          this.filteredMovements = data;
          this.sort('dateTime');
        },
        error: () => {
          this.movements = [];
          this.filteredMovements = [];
        },
      });
    }
  }

  sort(column: keyof StandardMovementI) {
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

  applyFilter(filterText: string) {
    if (this.movements) {
      if (!filterText) {
        this.filteredMovements = [...this.movements];
      } else {
        const regex = new RegExp(filterText, 'i');
        this.filteredMovements = this.movements.filter((movement) => {
          const dateTimeMatch = movement.dateTime.includes(filterText);
          return (
            regex.test(movement.type) ||
            regex.test(movement.subtype) ||
            regex.test(movement.reason) ||
            regex.test(movement.comment) ||
            regex.test(movement.quantity.toString()) ||
            dateTimeMatch
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
