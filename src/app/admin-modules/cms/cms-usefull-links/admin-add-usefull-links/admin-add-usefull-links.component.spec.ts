import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddUsefullLinksComponent } from './admin-add-usefull-links.component';

describe('AdminAddUsefullLinksComponent', () => {
  let component: AdminAddUsefullLinksComponent;
  let fixture: ComponentFixture<AdminAddUsefullLinksComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddUsefullLinksComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddUsefullLinksComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
