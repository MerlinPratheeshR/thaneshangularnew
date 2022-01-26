import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubGroupManagementComponent } from './admin-sub-group-management.component';

describe('AdminSubGroupManagementComponent', () => {
  let component: AdminSubGroupManagementComponent;
  let fixture: ComponentFixture<AdminSubGroupManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSubGroupManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubGroupManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
