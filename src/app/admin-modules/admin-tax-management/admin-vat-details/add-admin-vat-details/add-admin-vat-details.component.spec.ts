import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminVatDetailsComponent } from './add-admin-vat-details.component';

describe('AddAdminVatDetailsComponent', () => {
  let component: AddAdminVatDetailsComponent;
  let fixture: ComponentFixture<AddAdminVatDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminVatDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminVatDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
