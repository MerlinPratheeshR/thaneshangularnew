import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsubscriptionPlanComponent } from './addsubscription-plan.component';

describe('AddsubscriptionPlanComponent', () => {
  let component: AddsubscriptionPlanComponent;
  let fixture: ComponentFixture<AddsubscriptionPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsubscriptionPlanComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsubscriptionPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
