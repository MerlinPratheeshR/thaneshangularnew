import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCommissionManagementComponent } from './admin-commission-management.component';

describe('AdminCommissionManagementComponent', () => {
  let component: AdminCommissionManagementComponent;
  let fixture: ComponentFixture<AdminCommissionManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCommissionManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCommissionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
