import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainStudyTeamComponent } from './main-study-team.component';

describe('MainStudyTeamComponent', () => {
  let component: MainStudyTeamComponent;
  let fixture: ComponentFixture<MainStudyTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainStudyTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainStudyTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
