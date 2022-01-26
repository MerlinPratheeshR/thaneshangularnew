import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddStateComponent } from './admin-add-state.component';

describe('AdminAddStateComponent', () => {
  let component: AdminAddStateComponent;
  let fixture: ComponentFixture<AdminAddStateComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddStateComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddStateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
