import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminSmsTemplateManagementComponent } from './admin-sms-template-management.component';

describe('AdminSmsTemplateManagementComponent', () => {
  let component: AdminSmsTemplateManagementComponent;
  let fixture: ComponentFixture<AdminSmsTemplateManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminSmsTemplateManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminSmsTemplateManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
