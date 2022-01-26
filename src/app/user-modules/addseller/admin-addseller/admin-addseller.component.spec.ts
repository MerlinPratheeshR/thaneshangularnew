import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddsellerComponent } from './admin-addseller.component';

describe('AdminAddsellerComponent', () => {
  let component: AdminAddsellerComponent;
  let fixture: ComponentFixture<AdminAddsellerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddsellerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddsellerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
