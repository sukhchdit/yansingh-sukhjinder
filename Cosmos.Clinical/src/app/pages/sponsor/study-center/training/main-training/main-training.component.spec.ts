import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainTrainingComponent } from './main-training.component';

describe('MainTrainingComponent', () => {
  let component: MainTrainingComponent;
  let fixture: ComponentFixture<MainTrainingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainTrainingComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainTrainingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
