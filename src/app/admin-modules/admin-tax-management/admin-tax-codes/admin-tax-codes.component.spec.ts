import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminTaxCodesComponent } from './admin-tax-codes.component';

describe('AdminTaxCodesComponent', () => {
  let component: AdminTaxCodesComponent;
  let fixture: ComponentFixture<AdminTaxCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminTaxCodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminTaxCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
