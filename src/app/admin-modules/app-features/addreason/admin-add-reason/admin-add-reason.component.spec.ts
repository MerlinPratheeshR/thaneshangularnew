import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddReasonComponent } from './admin-add-reason.component';

describe('AdminAddReasonComponent', () => {
  let component: AdminAddReasonComponent;
  let fixture: ComponentFixture<AdminAddReasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddReasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddReasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
