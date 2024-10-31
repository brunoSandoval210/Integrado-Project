import { CommonModule } from '@angular/common';
import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ScheduleService } from '../../../../../services/schedule.service';
import { UserService } from '../../../../../services/user.service';
import { SharingDataService } from '../../../../../services/sharing-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-schedule',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-schedule.component.html',
  styleUrl: './register-schedule.component.scss'
})
export class RegisterScheduleComponent implements OnInit {
  @Input() isEditMode: boolean = false;
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
      this.scheduleForm.patchValue(this.schedule);
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
      },
      error => {
        console.error('Error fetching users', error);
      }
    );
  }
  onSubmit(): void {
    if (this.scheduleForm.valid) {
      const formData = {
        ...this.scheduleForm.value,
        doctorId: +this.scheduleForm.value.doctorId // Convertir doctorId a número
      };

      // Verificar que todos los campos requeridos estén presentes y no sean nulos
      if (!formData.date || !formData.hourStart || !formData.hourEnd || !formData.statusSchedule || !formData.doctorId) {
        Swal.fire({
          icon: 'error',
          title: 'Error',
          text: 'Todos los campos son requeridos.'
        });
        return;
      }

      if (this.isEditMode) {
        this.scheduleService.updateSchedule(this.schedule.id, formData).subscribe(
          response => {
            console.log('Schedule updated successfully', response);
            this.sharingDataService.onScheduleCreated.emit();
            this.scheduleForm.reset(); // Limpiar el formulario
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
        this.scheduleService.createSchedule(this.scheduleForm.value).subscribe(
          response => {
            console.log('Schedule created successfully', response);
            this.sharingDataService.onScheduleCreated.emit();
            this.scheduleForm.reset(); // Limpiar el formulario
            Swal.fire({
              icon: 'success',
              title: 'Horario creado',
              text: 'El horario ha sido creado exitosamente.'
            });
          },
          error => {
            console.error('Error creating schedule', error);
            Swal.fire({
              icon: 'error',
              title: 'Error',
              text: error.error || 'Hubo un error al crear el horario.' // Mostrar el mensaje de error del backend
            });
          }
        );
      }
    }
  }
}