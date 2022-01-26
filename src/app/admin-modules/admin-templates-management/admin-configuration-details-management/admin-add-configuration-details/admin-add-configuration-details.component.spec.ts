import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAddConfigurationDetailsComponent } from './admin-add-configuration-details.component';

describe('AdminAddConfigurationDetailsComponent', () => {
  let component: AdminAddConfigurationDetailsComponent;
  let fixture: ComponentFixture<AdminAddConfigurationDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AdminAddConfigurationDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminAddConfigurationDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
