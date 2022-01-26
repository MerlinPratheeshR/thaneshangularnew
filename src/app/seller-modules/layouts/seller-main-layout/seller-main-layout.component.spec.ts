import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SellerMainLayoutComponent } from './seller-main-layout.component';

describe('SellerMainLayoutComponent', () => {
  let component: SellerMainLayoutComponent;
  let fixture: ComponentFixture<SellerMainLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SellerMainLayoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SellerMainLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
