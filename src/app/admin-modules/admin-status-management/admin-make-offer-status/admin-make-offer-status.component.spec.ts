import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminMakeOfferStatusComponent } from './admin-make-offer-status.component';

describe('AdminMakeOfferStatusComponent', () => {
  let component: AdminMakeOfferStatusComponent;
  let fixture: ComponentFixture<AdminMakeOfferStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminMakeOfferStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminMakeOfferStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
