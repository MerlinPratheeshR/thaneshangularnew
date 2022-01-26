import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddMakeOfferComponent } from './admin-add-make-offer.component';

describe('AdminAddMakeOfferComponent', () => {
  let component: AdminAddMakeOfferComponent;
  let fixture: ComponentFixture<AdminAddMakeOfferComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddMakeOfferComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddMakeOfferComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
