import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StudyContactComponent } from './study-contact.component';

describe('StudyContactComponent', () => {
  let component: StudyContactComponent;
  let fixture: ComponentFixture<StudyContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StudyContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StudyContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
