import { TestBed } from '@angular/core/testing';

import { AdminModuleService } from './admin-module.service';

describe('AdminModulesService', () => {
  let service: AdminModuleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AdminModuleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
