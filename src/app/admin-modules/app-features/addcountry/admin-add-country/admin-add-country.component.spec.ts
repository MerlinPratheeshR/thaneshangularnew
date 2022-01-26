import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddCountryComponent } from './admin-add-country.component';

describe('AdminAddCountryComponent', () => {
  let component: AdminAddCountryComponent;
  let fixture: ComponentFixture<AdminAddCountryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddCountryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddCountryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
