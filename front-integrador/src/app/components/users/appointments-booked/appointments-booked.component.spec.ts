import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentsBookedComponent } from './appointments-booked.component';

describe('AppointmentsBookedComponent', () => {
  let component: AppointmentsBookedComponent;
  let fixture: ComponentFixture<AppointmentsBookedComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentsBookedComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentsBookedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
