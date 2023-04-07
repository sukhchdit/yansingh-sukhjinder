import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteCommentModuleComponent } from './site-comment-module.component';

describe('SiteCommentModuleComponent', () => {
  let component: SiteCommentModuleComponent;
  let fixture: ComponentFixture<SiteCommentModuleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteCommentModuleComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SiteCommentModuleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
