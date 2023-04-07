import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSiteModalComponent } from './add-site-modal.component';

describe('AddSiteModalComponent', () => {
  let component: AddSiteModalComponent;
  let fixture: ComponentFixture<AddSiteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSiteModalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddSiteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
