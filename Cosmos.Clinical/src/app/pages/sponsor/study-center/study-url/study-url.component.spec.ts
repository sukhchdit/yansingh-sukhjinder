import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyUrlComponent } from './study-url.component';

describe('StudyUrlComponent', () => {
  let component: StudyUrlComponent;
  let fixture: ComponentFixture<StudyUrlComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyUrlComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyUrlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
