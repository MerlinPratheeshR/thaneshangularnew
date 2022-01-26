import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminQuoteStatusComponent } from './admin-quote-status.component';

describe('AdminQuoteStatusComponent', () => {
  let component: AdminQuoteStatusComponent;
  let fixture: ComponentFixture<AdminQuoteStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminQuoteStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminQuoteStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
