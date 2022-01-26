import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsBannerComponent } from './cms-banner.component';

describe('CmsBannerComponent', () => {
  let component: CmsBannerComponent;
  let fixture: ComponentFixture<CmsBannerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsBannerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsBannerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
