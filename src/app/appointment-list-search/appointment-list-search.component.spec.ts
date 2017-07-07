import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentListSearchComponent } from './appointment-list-search.component';

describe('AppointmentListSearchComponent', () => {
  let component: AppointmentListSearchComponent;
  let fixture: ComponentFixture<AppointmentListSearchComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppointmentListSearchComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppointmentListSearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
