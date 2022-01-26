import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminStaticPageManagementComponent } from './admin-static-page-management.component';

describe('AdminStaticPageManagementComponent', () => {
  let component: AdminStaticPageManagementComponent;
  let fixture: ComponentFixture<AdminStaticPageManagementComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminStaticPageManagementComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminStaticPageManagementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
