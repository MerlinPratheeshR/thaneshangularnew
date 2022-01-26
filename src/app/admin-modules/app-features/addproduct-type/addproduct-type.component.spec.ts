import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddproductTypeComponent } from './addproduct-type.component';

describe('AddproductTypeComponent', () => {
  let component: AddproductTypeComponent;
  let fixture: ComponentFixture<AddproductTypeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddproductTypeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddproductTypeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
