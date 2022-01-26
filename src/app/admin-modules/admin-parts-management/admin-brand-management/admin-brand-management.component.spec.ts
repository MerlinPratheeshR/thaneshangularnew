import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminBrandManagementComponent } from './admin-brand-management.component';

describe('AdminBrandManagementComponent', () => {
  let component: AdminBrandManagementComponent;
  let fixture: ComponentFixture<AdminBrandManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminBrandManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminBrandManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
