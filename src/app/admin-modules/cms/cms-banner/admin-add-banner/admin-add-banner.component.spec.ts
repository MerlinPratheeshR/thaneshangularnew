import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddBannerComponent } from './admin-add-banner.component';

describe('AdminAddBannerComponent', () => {
  let component: AdminAddBannerComponent;
  let fixture: ComponentFixture<AdminAddBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
