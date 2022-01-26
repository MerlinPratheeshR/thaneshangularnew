import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddsellersComponent } from './addsellers.component';

describe('AddsellersComponent', () => {
  let component: AddsellersComponent;
  let fixture: ComponentFixture<AddsellersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddsellersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddsellersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
