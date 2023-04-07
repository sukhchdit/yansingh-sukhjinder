import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EManagerModalComponent } from './e-manager-modal.component';

describe('EManagerModalComponent', () => {
  let component: EManagerModalComponent;
  let fixture: ComponentFixture<EManagerModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EManagerModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EManagerModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
