import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPaymentStatusComponent } from './admin-payment-status.component';

describe('AdminPaymentStatusComponent', () => {
  let component: AdminPaymentStatusComponent;
  let fixture: ComponentFixture<AdminPaymentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPaymentStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPaymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
