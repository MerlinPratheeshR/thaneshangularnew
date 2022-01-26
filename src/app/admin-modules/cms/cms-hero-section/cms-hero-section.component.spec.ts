import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsHeroSectionComponent } from './cms-hero-section.component';

describe('CmsHeroSectionComponent', () => {
  let component: CmsHeroSectionComponent;
  let fixture: ComponentFixture<CmsHeroSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsHeroSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsHeroSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
