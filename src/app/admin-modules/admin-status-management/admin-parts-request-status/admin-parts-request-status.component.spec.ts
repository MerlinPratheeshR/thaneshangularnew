import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminPartsRequestStatusComponent } from './admin-parts-request-status.component';

describe('AdminPartsRequestStatusComponent', () => {
  let component: AdminPartsRequestStatusComponent;
  let fixture: ComponentFixture<AdminPartsRequestStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminPartsRequestStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminPartsRequestStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
