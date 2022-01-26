import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsMobileSectionComponent } from './cms-mobile-section.component';

describe('CmsMobileSectionComponent', () => {
  let component: CmsMobileSectionComponent;
  let fixture: ComponentFixture<CmsMobileSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsMobileSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsMobileSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
