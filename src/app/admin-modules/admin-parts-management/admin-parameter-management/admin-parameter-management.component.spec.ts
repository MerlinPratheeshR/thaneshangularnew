import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminParameterManagementComponent } from './admin-parameter-management.component';

describe('AdminParameterManagementComponent', () => {
  let component: AdminParameterManagementComponent;
  let fixture: ComponentFixture<AdminParameterManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminParameterManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminParameterManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
