import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteUpdateProfileModuleComponent } from './site-update-profile-module.component';

describe('SiteUpdateProfileModuleComponent', () => {
  let component: SiteUpdateProfileModuleComponent;
  let fixture: ComponentFixture<SiteUpdateProfileModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteUpdateProfileModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteUpdateProfileModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
