import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteSiteComponent } from './site-site.component';

describe('SiteSiteComponent', () => {
  let component: SiteSiteComponent;
  let fixture: ComponentFixture<SiteSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteSiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
