import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdduserTypeComponent } from './adduser-type.component';

describe('AdduserTypeComponent', () => {
  let component: AdduserTypeComponent;
  let fixture: ComponentFixture<AdduserTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdduserTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdduserTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
