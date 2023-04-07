import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainStudyCenterComponent } from './main-study-center.component';

describe('MainStudyCenterComponent', () => {
  let component: MainStudyCenterComponent;
  let fixture: ComponentFixture<MainStudyCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainStudyCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainStudyCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
