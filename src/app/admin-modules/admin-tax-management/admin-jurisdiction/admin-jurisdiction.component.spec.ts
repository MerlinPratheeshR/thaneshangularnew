import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminJurisdictionComponent } from './admin-jurisdiction.component';

describe('AdminJurisdictionComponent', () => {
  let component: AdminJurisdictionComponent;
  let fixture: ComponentFixture<AdminJurisdictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminJurisdictionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminJurisdictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
