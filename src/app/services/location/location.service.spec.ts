import { TestBed } from '@angular/core/testing';

import { LocationService } from './location.service';
import { provideHttpClient } from '@angular/common/http';
import {
  HttpTestingController,
  provideHttpClientTesting,
} from '@angular/common/http/testing';
import { NewLocation, LocationUpdate } from '../../models/location/location';
import { LocationEntity } from '../../models/location/location-entity';

describe('LocationService', () => {
  let service: LocationService;
  let httpTesting: HttpTestingController;

  const mockNewLocation = new NewLocation('Central warehouse');
  const mockLocationUpdate = new LocationUpdate(1, 'Central warehouse');
  const mockLocationEntity = new LocationEntity(1, 1, 'Central warehouse');
  const mockLocationEntityArray = [mockLocationEntity];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    });
    service = TestBed.inject(LocationService);
    httpTesting = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTesting.verify();
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should register location', (done) => {
    service.setNewLocation(mockLocationEntity.name);
    service.registerLocation().subscribe({
      next: (response) => {
        expect(response).toEqual(mockLocationEntity);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });
    const req = httpTesting.expectOne('/api/secure/location');
    expect(req.request.method).toBe('POST');
    expect(req.request.body).toEqual(mockNewLocation);
    req.flush(mockLocationEntity);
  });

  it('should get locations', (done) => {
    service.getLocations().subscribe({
      next: (response) => {
        expect(response).toEqual(mockLocationEntityArray);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });
    const req = httpTesting.expectOne('/api/secure/location');
    expect(req.request.method).toBe('GET');
    req.flush(mockLocationEntityArray);
  });

  it('should send correct data when updating location', (done) => {
    service.setLocationUpdate(mockLocationUpdate.id, mockLocationUpdate.name);
    service.renameLocation().subscribe({
      next: (response) => {
        expect(response).toEqual(mockLocationEntity);
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });

    const req = httpTesting.expectOne('/api/secure/location/name');
    expect(req.request.method).toBe('PATCH');
    expect(req.request.body).toEqual(mockLocationUpdate);
    req.flush(mockLocationEntity);
  });

  it('should delete location', (done) => {
    service.deleteLocation(1).subscribe({
      next: (response) => {
        done();
      },
      error: () => {
        fail('The request should not have failed.');
      },
    });
    const req = httpTesting.expectOne('/api/secure/location/1');
    expect(req.request.method).toBe('DELETE');
    req.flush(null);
  });

  it('should throw error when no location data is set for update', () => {
    expect(() => service.renameLocation()).toThrowError(
      'Undefined location data'
    );
  });

  it('should throw error when no location data is set for registry', () => {
    expect(() => service.registerLocation()).toThrowError(
      'Undefined location data'
    );
  });
});
