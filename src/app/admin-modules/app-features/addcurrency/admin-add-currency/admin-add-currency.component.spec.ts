import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCurrencyComponent } from './admin-add-currency.component';

describe('AdminAddCurrencyComponent', () => {
  let component: AdminAddCurrencyComponent;
  let fixture: ComponentFixture<AdminAddCurrencyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddCurrencyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddCurrencyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
