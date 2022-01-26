import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTemplatesManagementComponent } from './admin-templates-management.component';

describe('AdminTemplatesManagementComponent', () => {
  let component: AdminTemplatesManagementComponent;
  let fixture: ComponentFixture<AdminTemplatesManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTemplatesManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTemplatesManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
