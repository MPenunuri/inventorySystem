import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateEntityI } from '../../models/create-entity';
import {
  LocationI,
  LocationUpdate,
  NewLocation,
} from '../../models/location/location';
import { LocationEntityI } from '../../models/location/location-entity';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  private locationUpdate?: LocationI;
  private newLocation?: CreateEntityI<LocationI>;

  constructor(private http: HttpClient) {}

  setLocationUpdate(id: number, name: string, address?: string) {
    this.locationUpdate = new LocationUpdate(id, name, address);
  }

  setNewLocation(name: string, address?: string) {
    this.newLocation = new NewLocation(name, address);
  }

  registerLocation(): Observable<LocationEntityI> {
    if (this.newLocation == undefined) {
      throw new Error('Undefined location data');
    }
    return this.http.post<LocationEntityI>(
      '/api/secure/location',
      this.newLocation
    );
  }

  getLocations(): Observable<LocationEntityI[]> {
    return this.http.get<LocationEntityI[]>('/api/secure/location');
  }

  findLocationById(id: number): Observable<LocationI> {
    return this.http.get<LocationI>('/api/secure/location/' + id);
  }

  renameLocation(): Observable<LocationEntityI> {
    if (this.locationUpdate == undefined) {
      throw new Error('Undefined location data');
    }
    return this.http.patch<LocationEntityI>(
      '/api/secure/location/name',
      this.locationUpdate
    );
  }

  updateLocationAdress(): Observable<LocationEntityI> {
    if (this.locationUpdate == undefined) {
      throw new Error('Undefined location data');
    }
    return this.http.patch<LocationEntityI>(
      '/api/secure/location/address',
      this.locationUpdate
    );
  }

  deleteLocation(id: number): Observable<void> {
    return this.http.delete<void>('/api/secure/location/' + id);
  }
}
