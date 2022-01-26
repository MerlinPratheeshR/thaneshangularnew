import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminRegistrationStatusComponent } from './add-admin-registration-status.component';

describe('AddAdminRegistrationStatusComponent', () => {
  let component: AddAdminRegistrationStatusComponent;
  let fixture: ComponentFixture<AddAdminRegistrationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminRegistrationStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminRegistrationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
