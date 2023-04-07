import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EosDocumentsPrimarySiteComponent } from './eos-documents-primary-site.component';

describe('EosDocumentsPrimarySiteComponent', () => {
  let component: EosDocumentsPrimarySiteComponent;
  let fixture: ComponentFixture<EosDocumentsPrimarySiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EosDocumentsPrimarySiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EosDocumentsPrimarySiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
