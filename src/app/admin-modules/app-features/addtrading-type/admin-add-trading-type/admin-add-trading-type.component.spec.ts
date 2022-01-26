import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddTradingTypeComponent } from './admin-add-trading-type.component';

describe('AdminAddTradingTypeComponent', () => {
  let component: AdminAddTradingTypeComponent;
  let fixture: ComponentFixture<AdminAddTradingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddTradingTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddTradingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
