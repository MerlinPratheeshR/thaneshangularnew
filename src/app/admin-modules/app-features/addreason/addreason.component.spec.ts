import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddreasonComponent } from './addreason.component';

describe('AddreasonComponent', () => {
  let component: AddreasonComponent;
  let fixture: ComponentFixture<AddreasonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddreasonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddreasonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
