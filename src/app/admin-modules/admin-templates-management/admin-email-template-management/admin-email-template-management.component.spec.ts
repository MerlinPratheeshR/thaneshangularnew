import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminEmailTemplateManagementComponent } from './admin-email-template-management.component';

describe('AdminEmailTemplateManagementComponent', () => {
  let component: AdminEmailTemplateManagementComponent;
  let fixture: ComponentFixture<AdminEmailTemplateManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminEmailTemplateManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminEmailTemplateManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
