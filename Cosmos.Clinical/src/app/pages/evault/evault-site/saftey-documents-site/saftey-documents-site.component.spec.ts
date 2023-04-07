import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SafteyDocumentsSiteComponent } from './saftey-documents-site.component';

describe('SafteyDocumentsSiteComponent', () => {
  let component: SafteyDocumentsSiteComponent;
  let fixture: ComponentFixture<SafteyDocumentsSiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SafteyDocumentsSiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SafteyDocumentsSiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
