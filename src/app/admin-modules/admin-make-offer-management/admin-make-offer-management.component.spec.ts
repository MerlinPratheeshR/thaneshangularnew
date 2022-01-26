import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMakeOfferManagementComponent } from './admin-make-offer-management.component';

describe('AdminMakeOfferManagementComponent', () => {
  let component: AdminMakeOfferManagementComponent;
  let fixture: ComponentFixture<AdminMakeOfferManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMakeOfferManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMakeOfferManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
