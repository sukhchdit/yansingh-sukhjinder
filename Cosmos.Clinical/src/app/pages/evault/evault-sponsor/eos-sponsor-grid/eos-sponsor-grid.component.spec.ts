import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EosSponsorGridComponent } from './eos-sponsor-grid.component';

describe('EosSponsorGridComponent', () => {
  let component: EosSponsorGridComponent;
  let fixture: ComponentFixture<EosSponsorGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EosSponsorGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EosSponsorGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
