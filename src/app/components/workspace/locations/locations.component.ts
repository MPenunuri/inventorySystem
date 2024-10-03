import { Component } from '@angular/core';
import { LocationService } from '../../../services/location/location.service';
import { CommonModule } from '@angular/common';
import { FullLocationI } from '../../../models/location/fullLocation';
import { SortArrayService } from '../../../services/utils/sort-array.service';
import { SmallDeleteButtonComponent } from '../../commons/button/small-delete-button/small-delete-button.component';
import { AddProductComponent } from '../products/add-product/add-product.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { EditableTextAreaComponent } from '../../commons/editable/editable-text-area/editable-text-area.component';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [
    CommonModule,
    AddProductComponent,
    SmallDeleteButtonComponent,
    AddLocationComponent,
    EditableTextAreaComponent,
  ],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss',
})
export class LocationsComponent {
  locations?: FullLocationI[];
  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';

  constructor(
    public service: LocationService,
    public sortService: SortArrayService
  ) {}

  setLocations() {
    this.service.getLocations().subscribe({
      next: (data) => {
        this.locations = data;
        this.sort('locationName');
      },
      error: () => {
        this.locations = undefined;
      },
    });
  }

  ngOnInit(): void {
    this.setLocations();
  }

  sort(column: keyof FullLocationI) {
    if (this.locations !== undefined) {
      this.locations = this.sortService.sort(this.locations, column);
    }
  }
}
