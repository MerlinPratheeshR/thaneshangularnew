import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminMakeOfferStatusComponent } from './add-admin-make-offer-status.component';

describe('AddAdminMakeOfferStatusComponent', () => {
  let component: AddAdminMakeOfferStatusComponent;
  let fixture: ComponentFixture<AddAdminMakeOfferStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminMakeOfferStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminMakeOfferStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
