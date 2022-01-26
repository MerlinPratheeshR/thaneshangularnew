import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddMobileSectionComponent } from './admin-add-mobile-section.component';

describe('AdminAddMobileSectionComponent', () => {
  let component: AdminAddMobileSectionComponent;
  let fixture: ComponentFixture<AdminAddMobileSectionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddMobileSectionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddMobileSectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
