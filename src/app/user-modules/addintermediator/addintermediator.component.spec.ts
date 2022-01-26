import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddintermediatorComponent } from './addintermediator.component';

describe('AddintermediatorComponent', () => {
  let component: AddintermediatorComponent;
  let fixture: ComponentFixture<AddintermediatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddintermediatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddintermediatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
