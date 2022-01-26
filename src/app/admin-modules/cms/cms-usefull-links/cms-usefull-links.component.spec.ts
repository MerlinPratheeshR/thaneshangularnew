import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsUsefullLinksComponent } from './cms-usefull-links.component';

describe('CmsUsefullLinksComponent', () => {
  let component: CmsUsefullLinksComponent;
  let fixture: ComponentFixture<CmsUsefullLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsUsefullLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsUsefullLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
