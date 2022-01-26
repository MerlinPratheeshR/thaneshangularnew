import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminCategoryRequestStatusComponent } from './admin-category-request-status.component';

describe('AdminCategoryRequestStatusComponent', () => {
  let component: AdminCategoryRequestStatusComponent;
  let fixture: ComponentFixture<AdminCategoryRequestStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminCategoryRequestStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminCategoryRequestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
