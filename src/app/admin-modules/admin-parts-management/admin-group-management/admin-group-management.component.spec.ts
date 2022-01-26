import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminGroupManagementComponent } from './admin-group-management.component';

describe('AdminGroupManagementComponent', () => {
  let component: AdminGroupManagementComponent;
  let fixture: ComponentFixture<AdminGroupManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminGroupManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminGroupManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
