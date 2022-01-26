import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsBuyerSellerComponent } from './cms-buyer-seller.component';

describe('CmsBuyerSellerComponent', () => {
  let component: CmsBuyerSellerComponent;
  let fixture: ComponentFixture<CmsBuyerSellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsBuyerSellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsBuyerSellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
