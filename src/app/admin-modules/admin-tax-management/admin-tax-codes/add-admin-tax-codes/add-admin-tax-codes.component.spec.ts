import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminTaxCodesComponent } from './add-admin-tax-codes.component';

describe('AddAdminTaxCodesComponent', () => {
  let component: AddAdminTaxCodesComponent;
  let fixture: ComponentFixture<AddAdminTaxCodesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminTaxCodesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminTaxCodesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
