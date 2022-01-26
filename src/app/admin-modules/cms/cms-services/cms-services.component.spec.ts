import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CmsServicesComponent } from './cms-services.component';

describe('CmsServicesComponent', () => {
  let component: CmsServicesComponent;
  let fixture: ComponentFixture<CmsServicesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CmsServicesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CmsServicesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
