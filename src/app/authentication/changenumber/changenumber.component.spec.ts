import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangenumberComponent } from './changenumber.component';

describe('ChangenumberComponent', () => {
  let component: ChangenumberComponent;
  let fixture: ComponentFixture<ChangenumberComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangenumberComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangenumberComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
