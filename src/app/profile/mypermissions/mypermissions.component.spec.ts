import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MypermissionsComponent } from './mypermissions.component';

describe('MypermissionsComponent', () => {
  let component: MypermissionsComponent;
  let fixture: ComponentFixture<MypermissionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MypermissionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MypermissionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
