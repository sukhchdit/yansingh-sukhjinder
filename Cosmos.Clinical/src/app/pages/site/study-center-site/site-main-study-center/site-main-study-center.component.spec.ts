import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteMainStudyCenterComponent } from './site-main-study-center.component';

describe('SiteMainStudyCenterComponent', () => {
  let component: SiteMainStudyCenterComponent;
  let fixture: ComponentFixture<SiteMainStudyCenterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteMainStudyCenterComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteMainStudyCenterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
