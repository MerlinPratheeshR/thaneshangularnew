import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCommissionManagementComponent } from './admin-add-commission-management.component';

describe('AdminAddCommissionManagementComponent', () => {
  let component: AdminAddCommissionManagementComponent;
  let fixture: ComponentFixture<AdminAddCommissionManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddCommissionManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddCommissionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
