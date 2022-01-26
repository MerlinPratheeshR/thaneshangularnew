import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminConfigurationDetailsManagementComponent } from './admin-configuration-details-management.component';

describe('AdminConfigurationDetailsManagementComponent', () => {
  let component: AdminConfigurationDetailsManagementComponent;
  let fixture: ComponentFixture<AdminConfigurationDetailsManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminConfigurationDetailsManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminConfigurationDetailsManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
