import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentManagementComponent } from './admin-payment-management.component';

describe('AdminPaymentManagementComponent', () => {
  let component: AdminPaymentManagementComponent;
  let fixture: ComponentFixture<AdminPaymentManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPaymentManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaymentManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
