import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddbuyerComponent } from './admin-addbuyer.component';

describe('AdminAddbuyerComponent', () => {
  let component: AdminAddbuyerComponent;
  let fixture: ComponentFixture<AdminAddbuyerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddbuyerComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddbuyerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
