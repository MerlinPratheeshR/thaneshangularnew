import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddSmsTemplatesComponent } from './admin-add-sms-templates.component';

describe('AdminAddSmsTemplatesComponent', () => {
  let component: AdminAddSmsTemplatesComponent;
  let fixture: ComponentFixture<AdminAddSmsTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddSmsTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddSmsTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
