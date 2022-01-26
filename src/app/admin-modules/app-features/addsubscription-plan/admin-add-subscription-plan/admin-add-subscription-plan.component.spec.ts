import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddSubscriptionPlanComponent } from './admin-add-subscription-plan.component';

describe('AdminAddSubscriptionPlanComponent', () => {
  let component: AdminAddSubscriptionPlanComponent;
  let fixture: ComponentFixture<AdminAddSubscriptionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddSubscriptionPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddSubscriptionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
