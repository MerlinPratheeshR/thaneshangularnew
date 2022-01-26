import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RouterApiComponent } from './router-api.component';

describe('RouterApiComponent', () => {
  let component: RouterApiComponent;
  let fixture: ComponentFixture<RouterApiComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RouterApiComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RouterApiComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
