import { Component } from '@angular/core';
import { LocationService } from '../../../services/location/location.service';
import { CommonModule } from '@angular/common';
import { FullLocationI } from '../../../models/location/fullLocation';
import { SortArrayService } from '../../../services/utils/sort-array.service';
import { SmallDeleteButtonComponent } from '../../commons/button/small-delete-button/small-delete-button.component';
import { AddLocationComponent } from './add-location/add-location.component';
import { EditableTextAreaComponent } from '../../commons/editable/editable-text-area/editable-text-area.component';
import { EditableTextComponent } from '../../commons/editable/editable-text/editable-text.component';
import { LoadingComponent } from '../../commons/loading/loading.component';
import { EditableNavComponent } from '../../commons/editable/editable-nav/editable-nav.component';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-locations',
  standalone: true,
  imports: [
    CommonModule,
    SmallDeleteButtonComponent,
    AddLocationComponent,
    EditableTextComponent,
    EditableTextAreaComponent,
    EditableNavComponent,
    LoadingComponent,
  ],
  templateUrl: './locations.component.html',
  styleUrl: './locations.component.scss',
})
export class LocationsComponent {
  locations?: FullLocationI[];
  filteredLocations?: FullLocationI[];
  arrowDown = 'assets/arrow-down-outline.svg';
  arrowUp = 'assets/arrow-up-outline.svg';

  filterSubject: Subject<string> = new Subject<string>();

  constructor(
    public service: LocationService,
    public sortService: SortArrayService
  ) {
    this.filterSubject.pipe(debounceTime(500)).subscribe((filterText) => {
      this.applyFilter(filterText);
    });
  }

  setLocations() {
    this.service.getLocations().subscribe({
      next: (data) => {
        this.locations = data;
        this.filteredLocations = data;
        this.sort('locationName');
      },
      error: () => {
        this.locations = [];
        this.filteredLocations = [];
      },
    });
  }

  ngOnInit(): void {
    this.setLocations();
  }

  sort(column: keyof FullLocationI) {
    if (this.filteredLocations !== undefined) {
      this.filteredLocations = this.sortService.sort(
        this.filteredLocations,
        column
      );
    }
  }

  applyFilter(filterText: string) {
    if (this.locations) {
      if (!filterText) {
        this.filteredLocations = [...this.locations];
      } else {
        const regex = new RegExp(filterText, 'i');
        this.filteredLocations = this.locations.filter((i) => {
          return (
            regex.test(i.locationName) ||
            regex.test(i.locationAddress || '') ||
            regex.test(i.products.toString()) ||
            regex.test(i.movements.toString())
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
