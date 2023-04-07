import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UploadSafetyDocumentComponent } from './upload-safety-document.component';

describe('UploadSafetyDocumentComponent', () => {
  let component: UploadSafetyDocumentComponent;
  let fixture: ComponentFixture<UploadSafetyDocumentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UploadSafetyDocumentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UploadSafetyDocumentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
