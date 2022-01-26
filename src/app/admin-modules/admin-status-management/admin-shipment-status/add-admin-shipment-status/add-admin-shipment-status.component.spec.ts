import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminShipmentStatusComponent } from './add-admin-shipment-status.component';

describe('AddAdminShipmentStatusComponent', () => {
  let component: AddAdminShipmentStatusComponent;
  let fixture: ComponentFixture<AddAdminShipmentStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminShipmentStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminShipmentStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
