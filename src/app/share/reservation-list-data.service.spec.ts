import { TestBed } from '@angular/core/testing';

import { ReservationListDataService } from './reservation-list-data.service';

describe('ReservationListDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ReservationListDataService = TestBed.get(ReservationListDataService);
    expect(service).toBeTruthy();
  });
});
