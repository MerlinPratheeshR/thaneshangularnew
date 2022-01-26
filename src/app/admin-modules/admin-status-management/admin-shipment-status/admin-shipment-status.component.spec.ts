import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminShipmentStatusComponent } from './admin-shipment-status.component';

describe('AdminShipmentStatusComponent', () => {
  let component: AdminShipmentStatusComponent;
  let fixture: ComponentFixture<AdminShipmentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminShipmentStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminShipmentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
