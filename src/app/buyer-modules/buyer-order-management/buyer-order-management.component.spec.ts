import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerOrderManagementComponent } from './buyer-order-management.component';

describe('BuyerOrderManagementComponent', () => {
  let component: BuyerOrderManagementComponent;
  let fixture: ComponentFixture<BuyerOrderManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerOrderManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerOrderManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
