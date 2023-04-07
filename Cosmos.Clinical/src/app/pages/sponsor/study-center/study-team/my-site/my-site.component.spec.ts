import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MySiteComponent } from './my-site.component';

describe('MySiteComponent', () => {
  let component: MySiteComponent;
  let fixture: ComponentFixture<MySiteComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MySiteComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MySiteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
