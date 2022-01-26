import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsSocialMediaLinksComponent } from './cms-social-media-links.component';

describe('CmsSocialMediaLinksComponent', () => {
  let component: CmsSocialMediaLinksComponent;
  let fixture: ComponentFixture<CmsSocialMediaLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsSocialMediaLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsSocialMediaLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
