import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AppointmentResumeComponent } from './appointment-resume.component';

describe('AppointmentResumeComponent', () => {
  let component: AppointmentResumeComponent;
  let fixture: ComponentFixture<AppointmentResumeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AppointmentResumeComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AppointmentResumeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
