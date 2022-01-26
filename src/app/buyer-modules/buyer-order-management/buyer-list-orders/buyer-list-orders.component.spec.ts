import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerListOrdersComponent } from './buyer-list-orders.component';

describe('BuyerListOrdersComponent', () => {
  let component: BuyerListOrdersComponent;
  let fixture: ComponentFixture<BuyerListOrdersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerListOrdersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerListOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
