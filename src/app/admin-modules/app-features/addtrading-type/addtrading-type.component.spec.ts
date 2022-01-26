import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddtradingTypeComponent } from './addtrading-type.component';

describe('AddtradingTypeComponent', () => {
  let component: AddtradingTypeComponent;
  let fixture: ComponentFixture<AddtradingTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddtradingTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddtradingTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
