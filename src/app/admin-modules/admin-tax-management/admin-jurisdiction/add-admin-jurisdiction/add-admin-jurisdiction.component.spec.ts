import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminJurisdictionComponent } from './add-admin-jurisdiction.component';

describe('AddAdminJurisdictionComponent', () => {
  let component: AddAdminJurisdictionComponent;
  let fixture: ComponentFixture<AddAdminJurisdictionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminJurisdictionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminJurisdictionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
