import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteMySiteComponent } from './site-my-site.component';

describe('SiteMySiteComponent', () => {
  let component: SiteMySiteComponent;
  let fixture: ComponentFixture<SiteMySiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteMySiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteMySiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
