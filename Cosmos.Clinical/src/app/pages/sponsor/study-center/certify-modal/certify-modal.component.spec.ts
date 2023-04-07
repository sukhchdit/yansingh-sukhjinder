import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CertifyModalComponent } from './certify-modal.component';

describe('CertifyModalComponent', () => {
  let component: CertifyModalComponent;
  let fixture: ComponentFixture<CertifyModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CertifyModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CertifyModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
