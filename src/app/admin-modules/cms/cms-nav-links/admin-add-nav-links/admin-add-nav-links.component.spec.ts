import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddNavLinksComponent } from './admin-add-nav-links.component';

describe('AdminAddNavLinksComponent', () => {
  let component: AdminAddNavLinksComponent;
  let fixture: ComponentFixture<AdminAddNavLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddNavLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddNavLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
