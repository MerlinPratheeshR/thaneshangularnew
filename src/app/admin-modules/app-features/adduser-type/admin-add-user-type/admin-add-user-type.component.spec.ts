import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddUserTypeComponent } from './admin-add-user-type.component';

describe('AdminAddUserTypeComponent', () => {
  let component: AdminAddUserTypeComponent;
  let fixture: ComponentFixture<AdminAddUserTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddUserTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddUserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
