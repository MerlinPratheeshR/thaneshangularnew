import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsNavLinksComponent } from './cms-nav-links.component';

describe('CmsNavLinksComponent', () => {
  let component: CmsNavLinksComponent;
  let fixture: ComponentFixture<CmsNavLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsNavLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsNavLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
