import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminPaymentStatusComponent } from './add-admin-payment-status.component';

describe('AddAdminPaymentStatusComponent', () => {
  let component: AddAdminPaymentStatusComponent;
  let fixture: ComponentFixture<AddAdminPaymentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminPaymentStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminPaymentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
