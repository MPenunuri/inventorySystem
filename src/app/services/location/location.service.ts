import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {
  LocationI,
  LocationUpdate,
  NewLocation,
} from '../../models/location/location';
import { LocationEntityI } from '../../models/location/location-entity';
import { FullLocationI } from '../../models/location/fullLocation';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  constructor(private http: HttpClient) {}

  registerLocation(
    name: string,
    address?: string
  ): Observable<LocationEntityI> {
    const newLocation = new NewLocation(name, address);
    return this.http.post<LocationEntityI>(
      '/api/secure/location',
      newLocation.toObject()
    );
  }

  getLocations(): Observable<FullLocationI[]> {
    return this.http.get<FullLocationI[]>('/api/secure/location');
  }

  findLocationById(id: number): Observable<LocationI> {
    return this.http.get<LocationI>('/api/secure/location/' + id);
  }

  renameLocation(id: number, name: string): Observable<LocationEntityI> {
    const locationUpdate = new LocationUpdate(id);
    locationUpdate.name = name;
    return this.http.patch<LocationEntityI>(
      '/api/secure/location/name',
      locationUpdate.toObject()
    );
  }

  updateLocationAdress(
    id: number,
    address: string
  ): Observable<LocationEntityI> {
    const locationUpdate = new LocationUpdate(id);
    locationUpdate.address = address;
    return this.http.patch<LocationEntityI>(
      '/api/secure/location/address',
      locationUpdate.toObject()
    );
  }

  deleteLocation(id: number): Observable<void> {
    return this.http.delete<void>('/api/secure/location/' + id);
  }
}
