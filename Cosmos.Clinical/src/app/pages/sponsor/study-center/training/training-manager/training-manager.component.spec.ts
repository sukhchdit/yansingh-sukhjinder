import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TrainingManagerComponent } from './training-manager.component';

describe('TrainingManagerComponent', () => {
  let component: TrainingManagerComponent;
  let fixture: ComponentFixture<TrainingManagerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TrainingManagerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TrainingManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
