import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BuyerPagesComponent } from './buyer-pages.component';

describe('BuyerPagesComponent', () => {
  let component: BuyerPagesComponent;
  let fixture: ComponentFixture<BuyerPagesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BuyerPagesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BuyerPagesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
