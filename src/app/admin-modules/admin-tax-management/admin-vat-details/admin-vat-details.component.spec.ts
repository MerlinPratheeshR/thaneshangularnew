import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminVatDetailsComponent } from './admin-vat-details.component';

describe('AdminVatDetailsComponent', () => {
  let component: AdminVatDetailsComponent;
  let fixture: ComponentFixture<AdminVatDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminVatDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminVatDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
