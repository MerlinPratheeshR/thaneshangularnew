import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddEmailTemplatesComponent } from './admin-add-email-templates.component';

describe('AdminAddEmailTemplatesComponent', () => {
  let component: AdminAddEmailTemplatesComponent;
  let fixture: ComponentFixture<AdminAddEmailTemplatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddEmailTemplatesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddEmailTemplatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
