import { TestBed } from '@angular/core/testing';

import { IntermedaitorService } from './intermedaitor.service';

describe('IntermedaitorService', () => {
  let service: IntermedaitorService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IntermedaitorService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
