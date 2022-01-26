import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminPlaceOfSupplyComponent } from './add-admin-place-of-supply.component';

describe('AddAdminPlaceOfSupplyComponent', () => {
  let component: AddAdminPlaceOfSupplyComponent;
  let fixture: ComponentFixture<AddAdminPlaceOfSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminPlaceOfSupplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminPlaceOfSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
