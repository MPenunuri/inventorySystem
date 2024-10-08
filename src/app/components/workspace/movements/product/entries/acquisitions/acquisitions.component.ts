import { Component } from '@angular/core';
import { AcquisitionI } from '../../../../../../models/movement/entry/acquisition';
import { GetEntryService } from '../../../../../../services/movement/get-entry.service';
import { SortArrayService } from '../../../../../../services/utils/sort-array.service';
import { DeleteMovementService } from '../../../../../../services/movement/delete-movement.service';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { LoadingComponent } from '../../../../../commons/loading/loading.component';
import { SmallDeleteButtonComponent } from '../../../../../commons/button/small-delete-button/small-delete-button.component';
import { ButtonComponent } from '../../../../../commons/button/button.component';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-acquisitions',
  standalone: true,
  imports: [
    CommonModule,
    LoadingComponent,
    SmallDeleteButtonComponent,
    ButtonComponent,
  ],
  templateUrl: './acquisitions.component.html',
  styleUrl: './acquisitions.component.scss',
})
export class AcquisitionsComponent {
  productId?: number;
  productName?: string;
  movements?: AcquisitionI[];
  filteredMovements?: AcquisitionI[];
  addUrl?: string;
  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';

  filterSubject: Subject<string> = new Subject<string>();

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private service: GetEntryService,
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
      this.addUrl =
        '/workspace/movement/add-acquisition/' +
        this.productId +
        '/' +
        this.productName;
    }
  }

  setMovements() {
    if (this.productId) {
      this.service.getAcquisitions(this.productId).subscribe({
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

  sort(column: keyof AcquisitionI) {
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

  applyFilter(filterText: string) {
    if (this.movements) {
      if (!filterText) {
        this.filteredMovements = [...this.movements];
      } else {
        const regex = new RegExp(filterText, 'i');
        this.filteredMovements = this.movements.filter((movement) => {
          const dateTimeMatch = movement.dateTime.includes(filterText);
          return (
            regex.test(movement.reason) ||
            regex.test(movement.comment) ||
            regex.test(movement.quantity.toString()) ||
            regex.test(movement.toLocationName) ||
            regex.test(movement.supplierName) ||
            regex.test(movement.costType) ||
            regex.test(movement.cost.toString()) ||
            regex.test(movement.costCurrency) ||
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
