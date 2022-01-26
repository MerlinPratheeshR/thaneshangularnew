import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminQuoteStatusComponent } from './add-admin-quote-status.component';

describe('AddAdminQuoteStatusComponent', () => {
  let component: AddAdminQuoteStatusComponent;
  let fixture: ComponentFixture<AddAdminQuoteStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminQuoteStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminQuoteStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
