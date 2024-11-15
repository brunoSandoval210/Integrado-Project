import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { SharingDataService } from '../../../../services/sharing-data.service';
import { AppointmentService } from '../../../../services/appointment.service';
import Swal from 'sweetalert2';
import { AuthService } from '../../../../services/auth.service';
import { UserService } from '../../../../services/user.service';

@Component({
  selector: 'app-appointment-resume',
  standalone: true,
  imports: [],
  templateUrl: './appointment-resume.component.html',
  styleUrls: ['./appointment-resume.component.scss']
})
export class AppointmentResumeComponent implements OnInit {
  @Input() schedule: any = null;
  patient: any = null;
  cost: number = 40;

  constructor(
    private sharingDataService: SharingDataService,
    private appointmentService: AppointmentService,
    private authService: AuthService,
    private userService: UserService

  ) { }

  ngOnInit(): void {
    this.getUser();
  }

  pay(): void {
   this.sharingDataService.changeEditMode.emit(false);
   
  }

  payInPerson(): void {
    const appointment = {
      statusAppointment: 'CONFIRMADA_SIN_PAGAR',
      userId: this.authService.getUserId(),
      scheduleId: this.schedule.id
    };
    this.appointmentService.createAppointment(appointment).subscribe(
      response => {
        this.sharingDataService.onScheduleUpdate.emit();
        Swal.fire({
          icon: 'success',
          title: 'Cita creada',
          text: 'La cita ha sido creada exitosamente.'
        });
      },
      error => {
        console.error('Error creating appointment', error);
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Hubo un error al crear la cita.'
        });
      }
    );
  }

  getUser(): void {
    this.userService.getById(this.authService.getUserId()).subscribe(
      response => {
        this.patient = response;
        console.log('User', this.patient);
      },
      error => {
        console.error('Error getting user', error);
      }
    );
  }
}