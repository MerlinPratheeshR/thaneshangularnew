import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddProductTypeComponent } from './admin-add-product-type.component';

describe('AdminAddProductTypeComponent', () => {
  let component: AdminAddProductTypeComponent;
  let fixture: ComponentFixture<AdminAddProductTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddProductTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddProductTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
