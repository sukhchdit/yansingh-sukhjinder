import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadTrainingModalComponent } from './upload-training-modal.component';

describe('UploadTrainingModalComponent', () => {
  let component: UploadTrainingModalComponent;
  let fixture: ComponentFixture<UploadTrainingModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadTrainingModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadTrainingModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
