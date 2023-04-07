import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteNewsComponent } from './site-news.component';

describe('SiteNewsComponent', () => {
  let component: SiteNewsComponent;
  let fixture: ComponentFixture<SiteNewsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteNewsComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteNewsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
