import { Component, Input, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { ScheduleService } from '../../../../services/schedule.service';
import { SharingDataService } from '../../../../services/sharing-data.service';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-edit-schedule',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-schedule.component.html',
  styleUrls: ['./edit-schedule.component.scss']
})
export class EditScheduleComponent {
  @Input() schedule: any = null;
  scheduleForm: FormGroup;
  usersFilter: any[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private scheduleService: ScheduleService,
    private sharingDataService: SharingDataService
  ) {
    this.scheduleForm = this.fb.group({
      date: ['', Validators.required],
      hourStart: ['', Validators.required],
      hourEnd: ['', Validators.required],
      statusSchedule: [null, Validators.required],
      doctorId: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getUsers();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['schedule'] && this.schedule) {
      // Buscar el ID del médico basado en el nombre del médico
      const doctor = this.usersFilter.find(user => user.name + ' ' + user.lastname === this.schedule.doctorName);
      const doctorId = doctor ? doctor.id : null;

      // Actualizar el formulario con el ID del médico
      this.scheduleForm.patchValue({
        ...this.schedule,
        doctorId: doctorId
      });
    }
  }

  getUsers(): void {
    const filters = {
      page: 0,
      size: 100,
      roleId: 3
    };
    this.userService.getUsers(filters).subscribe(
      data => {
        this.usersFilter = data.content;
        if (this.schedule) {
          const doctor = this.usersFilter.find(user => user.name + ' ' + user.lastname === this.schedule.doctorName);
          const doctorId = doctor ? doctor.id : null;
          this.scheduleForm.patchValue({ doctorId: doctorId });
          console.log('Doctor ID', doctorId );
        }
      },
      error => {
        console.error('Error fetching users', error);
      }
    );
  }

  onSubmit(): void {
    if (this.scheduleForm.valid) {
      console.log('Form data', this.scheduleForm.value);
      this.scheduleService.updateSchedule(this.schedule.id, this.scheduleForm.value).subscribe(
        response => {
          console.log('Schedule updated successfully', response);
          this.sharingDataService.onScheduleUpdate.emit();
         this.scheduleForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Horario actualizado',
            text: 'El horario ha sido actualizado exitosamente.'
          });
        },
        error => {
          console.error('Error updating schedule', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error || 'Hubo un error al actualizar el horario.' // Mostrar el mensaje de error del backend
          });
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos requeridos.'
      });
    }
  }
}