import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminModelManagementComponent } from './admin-model-management.component';

describe('AdminModelManagementComponent', () => {
  let component: AdminModelManagementComponent;
  let fixture: ComponentFixture<AdminModelManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminModelManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminModelManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
