import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddintermediatorComponent } from './admin-addintermediator.component';

describe('AdminAddintermediatorComponent', () => {
  let component: AdminAddintermediatorComponent;
  let fixture: ComponentFixture<AdminAddintermediatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddintermediatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddintermediatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
