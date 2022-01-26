import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsFeaturesComponent } from './cms-features.component';

describe('CmsFeaturesComponent', () => {
  let component: CmsFeaturesComponent;
  let fixture: ComponentFixture<CmsFeaturesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsFeaturesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsFeaturesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
