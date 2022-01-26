import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminRegistrationStatusComponent } from './admin-registration-status.component';

describe('AdminRegistrationStatusComponent', () => {
  let component: AdminRegistrationStatusComponent;
  let fixture: ComponentFixture<AdminRegistrationStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminRegistrationStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminRegistrationStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
