import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ReprograminAppointmentComponent } from './reprogramin-appointment.component';

describe('ReprograminAppointmentComponent', () => {
  let component: ReprograminAppointmentComponent;
  let fixture: ComponentFixture<ReprograminAppointmentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ReprograminAppointmentComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ReprograminAppointmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
