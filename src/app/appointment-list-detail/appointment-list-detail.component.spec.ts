import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentListDetailComponent } from './appointment-list-detail.component';

describe('AppointmentListDetailComponent', () => {
  let component: AppointmentListDetailComponent;
  let fixture: ComponentFixture<AppointmentListDetailComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentListDetailComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentListDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
