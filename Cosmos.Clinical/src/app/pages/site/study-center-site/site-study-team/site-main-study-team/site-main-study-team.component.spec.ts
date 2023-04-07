import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteMainStudyTeamComponent } from './site-main-study-team.component';

describe('SiteMainStudyTeamComponent', () => {
  let component: SiteMainStudyTeamComponent;
  let fixture: ComponentFixture<SiteMainStudyTeamComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteMainStudyTeamComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteMainStudyTeamComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
