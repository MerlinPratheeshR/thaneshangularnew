import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVinSearchHistoryManagementComponent } from './admin-vin-search-history-management.component';

describe('AdminVinSearchHistoryManagementComponent', () => {
  let component: AdminVinSearchHistoryManagementComponent;
  let fixture: ComponentFixture<AdminVinSearchHistoryManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVinSearchHistoryManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVinSearchHistoryManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
