import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddSubscriptionManagementComponent } from './admin-add-subscription-management.component';

describe('AdminAddSubscriptionManagementComponent', () => {
  let component: AdminAddSubscriptionManagementComponent;
  let fixture: ComponentFixture<AdminAddSubscriptionManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddSubscriptionManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddSubscriptionManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
