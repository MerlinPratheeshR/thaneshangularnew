import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerMainLayoutComponent } from './buyer-main-layout.component';

describe('BuyerMainLayoutComponent', () => {
  let component: BuyerMainLayoutComponent;
  let fixture: ComponentFixture<BuyerMainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerMainLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
