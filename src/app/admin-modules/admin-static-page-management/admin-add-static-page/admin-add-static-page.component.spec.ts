import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddStaticPageComponent } from './admin-add-static-page.component';

describe('AdminAddStaticPageComponent', () => {
  let component: AdminAddStaticPageComponent;
  let fixture: ComponentFixture<AdminAddStaticPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddStaticPageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddStaticPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
