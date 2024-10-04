import { Component, EventEmitter, Input, Output } from '@angular/core';
import { LocationService } from '../../../../../services/location/location.service';
import { StockI } from '../../../../../models/stock/stock';
import { SortArrayService } from '../../../../../services/utils/sort-array.service';
import { EditableTextAreaComponent } from '../../../../commons/editable/editable-text-area/editable-text-area.component';
import { EditableTextComponent } from '../../../../commons/editable/editable-text/editable-text.component';
import { CommonModule } from '@angular/common';
import { SmallDeleteButtonComponent } from '../../../../commons/button/small-delete-button/small-delete-button.component';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [
    CommonModule,
    EditableTextComponent,
    EditableTextAreaComponent,
    SmallDeleteButtonComponent,
  ],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss',
})
export class LocationsComponent {
  @Input() productId?: number;
  @Input() stockList?: StockI[];
  @Output() stockRemoved: EventEmitter<void> = new EventEmitter();

  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';

  constructor(
    public service: LocationService,
    public sortService: SortArrayService
  ) {}

  sortStockList(column: string) {
    if (this.stockList !== undefined) {
      this.stockList = this.sortService.sort(this.stockList, column);
    }
  }

  stockRemovedEmit() {
    this.stockRemoved.emit();
  }
}
