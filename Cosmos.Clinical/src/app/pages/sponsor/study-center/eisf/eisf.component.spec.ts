import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EisfComponent } from './eisf.component';

describe('EisfComponent', () => {
  let component: EisfComponent;
  let fixture: ComponentFixture<EisfComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EisfComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EisfComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
