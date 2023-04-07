import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaultFilePdfViewerComponent } from './evault-file-pdf-viewer.component';

describe('EvaultFilePdfViewerComponent', () => {
  let component: EvaultFilePdfViewerComponent;
  let fixture: ComponentFixture<EvaultFilePdfViewerComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaultFilePdfViewerComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaultFilePdfViewerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
