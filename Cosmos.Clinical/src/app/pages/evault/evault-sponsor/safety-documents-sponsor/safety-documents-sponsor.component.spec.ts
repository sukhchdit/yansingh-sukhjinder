import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafetyDocumentsSponsorComponent } from './safety-documents-sponsor.component';

describe('SafetyDocumentsSponsorComponent', () => {
  let component: SafetyDocumentsSponsorComponent;
  let fixture: ComponentFixture<SafetyDocumentsSponsorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafetyDocumentsSponsorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafetyDocumentsSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
