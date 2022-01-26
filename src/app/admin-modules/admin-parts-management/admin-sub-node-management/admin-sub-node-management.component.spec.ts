import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSubNodeManagementComponent } from './admin-sub-node-management.component';

describe('AdminSubNodeManagementComponent', () => {
  let component: AdminSubNodeManagementComponent;
  let fixture: ComponentFixture<AdminSubNodeManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSubNodeManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSubNodeManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
