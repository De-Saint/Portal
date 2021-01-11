import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidationpageComponent } from './validationpage.component';

describe('ValidationpageComponent', () => {
  let component: ValidationpageComponent;
  let fixture: ComponentFixture<ValidationpageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ValidationpageComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ValidationpageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
