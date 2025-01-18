import { Component, Input } from '@angular/core';
import { AppointmentService } from '../../../../services/appointment.service';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { SharingDataService } from '../../../../services/sharing-data.service';

@Component({
  selector: 'app-reprogramin-appointment',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './reprogramin-appointment.component.html',
  styleUrls: ['./reprogramin-appointment.component.scss']
})
export class ReprograminAppointmentComponent {
  @Input() appointment: any;
  rescheduleForm: FormGroup;

  constructor(
    private appointmentService: AppointmentService,
    private fb: FormBuilder,
    private sharingDataService: SharingDataService
  ) {
    this.rescheduleForm = this.fb.group({
      previousDate: [{ value: '', disabled: true }, Validators.required],
      newDate: ['', Validators.required],
      hourStart: ['', Validators.required],
      hourEnd: ['', Validators.required],
      reason: ['', Validators.required],
      appointmentId: ['', Validators.required]
    });
  }

  ngOnChanges(): void {
    if (this.appointment) {
      this.rescheduleForm.patchValue({
        previousDate: this.appointment.schedule.date,
        appointmentId: this.appointment.id
      });
    }
  }

  rescheduleAppointment(): void {
    if (this.rescheduleForm.valid) {
      const rescheduleRequest = this.rescheduleForm.getRawValue();
      this.appointmentService.rescheduleAppointment(rescheduleRequest).subscribe(
        () => {
          Swal.fire('Cita reprogramada', 'La cita ha sido reprogramada exitosamente', 'success');
          this.sharingDataService.onOpenCloseModal.emit(false);
        },
        error => {
          console.error('Error rescheduling appointment', error);
          Swal.fire('Error', 'Ha ocurrido un error al reprogramar la cita', 'error');
          this.sharingDataService.onOpenCloseModal.emit(false);

        }
      );
    } else {
      Swal.fire('Error', 'Por favor, complete todos los campos requeridos', 'error');
      this.sharingDataService.onOpenCloseModal.emit(false);

    }
  }
}