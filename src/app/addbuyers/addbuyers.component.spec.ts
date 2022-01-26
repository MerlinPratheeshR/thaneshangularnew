import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddbuyersComponent } from './addbuyers.component';

describe('AddbuyersComponent', () => {
  let component: AddbuyersComponent;
  let fixture: ComponentFixture<AddbuyersComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddbuyersComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddbuyersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
