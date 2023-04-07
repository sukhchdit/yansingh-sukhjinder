import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EvaultCommonActionDialogComponent } from './evault-common-action-dialog.component';

describe('EvaultCommonActionDialogComponent', () => {
  let component: EvaultCommonActionDialogComponent;
  let fixture: ComponentFixture<EvaultCommonActionDialogComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EvaultCommonActionDialogComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EvaultCommonActionDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
