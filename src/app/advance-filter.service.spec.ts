import { TestBed } from '@angular/core/testing';

import { AdvanceFilterService } from './advance-filter.service';

describe('AdvanceFilterService', () => {
  let service: AdvanceFilterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdvanceFilterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
