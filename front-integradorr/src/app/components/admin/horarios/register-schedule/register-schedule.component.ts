import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ScheduleService } from '../../../../services/schedule.service';
import { UserService } from '../../../../services/user.service';
import { SharingDataService } from '../../../../services/sharing-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-schedule',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-schedule.component.html',
  styleUrl: './register-schedule.component.scss'
})
export class RegisterScheduleComponent implements OnInit {
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

    this.sharingDataService.onOpenCloseModal.subscribe((isOpen:boolean)=>{
      if(isOpen){
        this.scheduleForm.reset();
      }
    })
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
      const formData = { ...this.scheduleForm.value };
      // console.log('Form data before sending:', formData); // Agrega esta línea para depurar
      this.scheduleService.createSchedule(formData).subscribe(
        response => {
          // console.log('Schedule created successfully', response);
          this.sharingDataService.onScheduleCreated.emit();
          this.scheduleForm.reset();
          this.sharingDataService.onOpenCloseModal.emit(false);
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
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos requeridos.'
      });
    }
  }
}