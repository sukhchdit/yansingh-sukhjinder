import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMapTrainingModalComponent } from './add-map-training-modal.component';

describe('AddMapTrainingModalComponent', () => {
  let component: AddMapTrainingModalComponent;
  let fixture: ComponentFixture<AddMapTrainingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMapTrainingModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddMapTrainingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
