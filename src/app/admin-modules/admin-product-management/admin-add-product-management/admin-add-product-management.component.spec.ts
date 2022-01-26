import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddProductManagementComponent } from './admin-add-product-management.component';

describe('AdminAddProductManagementComponent', () => {
  let component: AdminAddProductManagementComponent;
  let fixture: ComponentFixture<AdminAddProductManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddProductManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddProductManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
