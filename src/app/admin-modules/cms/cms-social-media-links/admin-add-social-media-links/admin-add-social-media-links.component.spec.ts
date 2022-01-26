import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddSocialMediaLinksComponent } from './admin-add-social-media-links.component';

describe('AdminAddSocialMediaLinksComponent', () => {
  let component: AdminAddSocialMediaLinksComponent;
  let fixture: ComponentFixture<AdminAddSocialMediaLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddSocialMediaLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddSocialMediaLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
