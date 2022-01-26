import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddpayoutScheduleComponent } from './addpayout-schedule.component';

describe('AddpayoutScheduleComponent', () => {
  let component: AddpayoutScheduleComponent;
  let fixture: ComponentFixture<AddpayoutScheduleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddpayoutScheduleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddpayoutScheduleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
