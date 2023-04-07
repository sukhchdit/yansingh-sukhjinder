import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImportSitesModalComponent } from './import-sites-modal.component';

describe('ImportSitesModalComponent', () => {
  let component: ImportSitesModalComponent;
  let fixture: ComponentFixture<ImportSitesModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImportSitesModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ImportSitesModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
