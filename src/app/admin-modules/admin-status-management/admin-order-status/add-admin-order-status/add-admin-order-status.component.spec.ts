import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminOrderStatusComponent } from './add-admin-order-status.component';

describe('AddAdminOrderStatusComponent', () => {
  let component: AddAdminOrderStatusComponent;
  let fixture: ComponentFixture<AddAdminOrderStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminOrderStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminOrderStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
