import { TestBed, inject } from '@angular/core/testing';

import { AppointmentListSearchService } from './appointment-list-search.service';

describe('AppointmentListSearchService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [AppointmentListSearchService]
    });
  });

  it('should be created', inject([AppointmentListSearchService], (service: AppointmentListSearchService) => {
    expect(service).toBeTruthy();
  }));
});
