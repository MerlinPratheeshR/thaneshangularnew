import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EcellsComponent } from './ecells.component';

describe('EcellsComponent', () => {
  let component: EcellsComponent;
  let fixture: ComponentFixture<EcellsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EcellsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EcellsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
