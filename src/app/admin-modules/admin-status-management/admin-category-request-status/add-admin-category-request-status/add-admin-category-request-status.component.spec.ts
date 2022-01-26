import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminCategoryRequestStatusComponent } from './add-admin-category-request-status.component';

describe('AddAdminCategoryRequestStatusComponent', () => {
  let component: AddAdminCategoryRequestStatusComponent;
  let fixture: ComponentFixture<AddAdminCategoryRequestStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminCategoryRequestStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminCategoryRequestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
