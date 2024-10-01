import { TestBed } from '@angular/core/testing';

import { SortArrayService } from './sort-array.service';

describe('SortArrayService', () => {
  let service: SortArrayService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SortArrayService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
