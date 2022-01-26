import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPlaceOfSupplyComponent } from './admin-place-of-supply.component';

describe('AdminPlaceOfSupplyComponent', () => {
  let component: AdminPlaceOfSupplyComponent;
  let fixture: ComponentFixture<AdminPlaceOfSupplyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPlaceOfSupplyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPlaceOfSupplyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
