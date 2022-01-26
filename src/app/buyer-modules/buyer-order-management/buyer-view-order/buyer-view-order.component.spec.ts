import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerViewOrderComponent } from './buyer-view-order.component';

describe('BuyerViewOrderComponent', () => {
  let component: BuyerViewOrderComponent;
  let fixture: ComponentFixture<BuyerViewOrderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerViewOrderComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerViewOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
