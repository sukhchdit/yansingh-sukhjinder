import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EosDocumentsSponsorComponent } from './eos-documents-sponsor.component';

describe('EosDocumentsSponsorComponent', () => {
  let component: EosDocumentsSponsorComponent;
  let fixture: ComponentFixture<EosDocumentsSponsorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EosDocumentsSponsorComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EosDocumentsSponsorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
