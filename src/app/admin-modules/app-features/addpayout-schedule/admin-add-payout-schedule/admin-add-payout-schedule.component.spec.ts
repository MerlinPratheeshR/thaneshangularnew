import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddPayoutScheduleComponent } from './admin-add-payout-schedule.component';

describe('AdminAddPayoutScheduleComponent', () => {
  let component: AdminAddPayoutScheduleComponent;
  let fixture: ComponentFixture<AdminAddPayoutScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddPayoutScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddPayoutScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
