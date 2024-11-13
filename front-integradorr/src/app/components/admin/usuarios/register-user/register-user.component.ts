import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { SharingDataService } from '../../../../services/sharing-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register-user.component.html',
  styleUrls: ['./register-user.component.scss']
})
export class RegisterUserComponent implements OnInit {
  userForm: FormGroup;
  specializations: any[] = [];

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private sharingDataService: SharingDataService
  ) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]], // Solo letras y espacios
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]], // Solo letras y espacios
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], // Solo números y 8 dígitos
      email: ['', [Validators.required, Validators.email]],
      role: [null, Validators.required],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]], // Mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número
      specialization: [null],
      status: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getSpecializations();
    this.userForm.get('role')?.valueChanges.subscribe(value => {
      if (value === 3) { // 3 es el ID del rol Doctor
        this.userForm.get('specialization')?.setValidators([Validators.required]);
      } else {
        this.userForm.get('specialization')?.clearValidators();
      }
      this.userForm.get('specialization')?.updateValueAndValidity();
    });

    this.sharingDataService.onOpenCloseModal.subscribe((isOpen: boolean) => {
      if (isOpen) {
        this.userForm.reset();
      }
    });
  }

  getSpecializations(): void {
    this.userService.getSpecializacionsDoctor().subscribe(
      data => {
        this.specializations = data;
        console.log('Specializations', data);
      },
      error => {
        console.error('Error fetching specializations', error);
      }
    );
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      this.userService.createUser(this.userForm.value).subscribe(
        response => {
          console.log('User created successfully', response);
          this.sharingDataService.onScheduleCreated.emit();
          this.userForm.reset(); // Limpiar el formulario
          this.sharingDataService.onOpenCloseModal.emit(false); // Cerrar el modal
          Swal.fire({
            icon: 'success',
            title: 'Usuario creado',
            text: 'El usuario ha sido creado exitosamente.'
          });
        },
        error => {
          console.error('Error creating user', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error || 'Hubo un error al crear el usuario.' // Mostrar el mensaje de error del backend
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

  resetForm(): void {
    this.userForm.reset();
  }
}