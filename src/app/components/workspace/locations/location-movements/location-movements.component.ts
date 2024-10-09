import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subject, debounceTime } from 'rxjs';
import { StandardMovementI } from '../../../../models/movement/standard-movement';
import { DeleteMovementService } from '../../../../services/movement/delete-movement.service';
import { GetMovementService } from '../../../../services/movement/get-movement.service';
import { SortArrayService } from '../../../../services/utils/sort-array.service';
import { CommonModule } from '@angular/common';
import { SmallDeleteButtonComponent } from '../../../commons/button/small-delete-button/small-delete-button.component';
import { EditableNavComponent } from '../../../commons/editable/editable-nav/editable-nav.component';
import { LoadingComponent } from '../../../commons/loading/loading.component';

@Component({
  selector: 'app-location-movements',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    SmallDeleteButtonComponent,
    EditableNavComponent,
  ],
  templateUrl: './location-movements.component.html',
  styleUrl: './location-movements.component.scss',
})
export class LocationMovementsComponent {
  locationId?: number;
  locationName?: string;
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
    const paramId = this.route.snapshot.paramMap.get('locationId');
    const paramName = this.route.snapshot.paramMap.get('locationName');
    if (paramId !== null) {
      this.locationId = parseInt(paramId);
      this.setMovements();
    }
    if (paramName !== null) {
      this.locationName = paramName;
    }
  }

  setMovements() {
    if (this.locationId) {
      this.service.getMovementsOnLocation(this.locationId).subscribe({
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
    if (this.filteredMovements !== undefined) {
      this.filteredMovements = this.sortService.sort(
        this.filteredMovements,
        column
      );
    }
  }

  getEditTypeRoute(type: string, productId: number, productName: string) {
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
    return route + '/' + productId + '/' + productName;
  }

  getEditSubtypeRoute(
    type: string,
    subtype: string,
    productId: number,
    productName: string
  ) {
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
    return route + '/' + productId + '/' + productName;
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
