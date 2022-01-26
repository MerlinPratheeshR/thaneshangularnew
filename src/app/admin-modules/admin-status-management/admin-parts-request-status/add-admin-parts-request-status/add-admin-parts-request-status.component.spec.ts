import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddAdminPartsRequestStatusComponent } from './add-admin-parts-request-status.component';

describe('AddAdminPartsRequestStatusComponent', () => {
  let component: AddAdminPartsRequestStatusComponent;
  let fixture: ComponentFixture<AddAdminPartsRequestStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddAdminPartsRequestStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddAdminPartsRequestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
