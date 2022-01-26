import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddcarsComponent } from './addcars.component';

describe('AddcarsComponent', () => {
  let component: AddcarsComponent;
  let fixture: ComponentFixture<AddcarsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddcarsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddcarsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
