import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddOrderComponent } from './admin-add-order.component';

describe('AdminAddOrderComponent', () => {
  let component: AdminAddOrderComponent;
  let fixture: ComponentFixture<AdminAddOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
