import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStudyUrlModalComponent } from './add-study-url-modal.component';

describe('AddStudyUrlModalComponent', () => {
  let component: AddStudyUrlModalComponent;
  let fixture: ComponentFixture<AddStudyUrlModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStudyUrlModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddStudyUrlModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
