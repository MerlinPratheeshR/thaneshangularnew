import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminListOrdersComponent } from './admin-list-orders.component';

describe('AdminListOrdersComponent', () => {
  let component: AdminListOrdersComponent;
  let fixture: ComponentFixture<AdminListOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminListOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminListOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
