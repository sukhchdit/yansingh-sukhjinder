import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteStudyContactComponent } from './site-study-contact.component';

describe('SiteStudyContactComponent', () => {
  let component: SiteStudyContactComponent;
  let fixture: ComponentFixture<SiteStudyContactComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteStudyContactComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteStudyContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
