import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { UserService } from '../../../../services/user.service';
import { SharingDataService } from '../../../../services/sharing-data.service';
import { CommonModule } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.scss']
})
export class EditUserComponent implements OnInit, OnChanges {
  @Input() user: any = null;
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
      specialization: [null],
      status: [null, Validators.required]
    });
  }

  ngOnInit(): void {
    this.getSpecializations();
    if (this.user) {
      this.setFormValues(this.user);
    }

    this.userForm.get('role')?.valueChanges.subscribe(value => {
      if (value === 3) { // 3 es el ID del rol Doctor
        this.userForm.get('specialization')?.setValidators([Validators.required]);
      } else {
        this.userForm.get('specialization')?.clearValidators();
      }
      this.userForm.get('specialization')?.updateValueAndValidity();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['user'] && changes['user'].currentValue) {
      this.setFormValues(changes['user'].currentValue);
    }
  }

  setFormValues(user: any): void {
    this.userForm.patchValue({
      name: user.name,
      lastname: user.lastname,
      dni: user.dni,
      email: user.email,
      role: user.role.id,
      specialization: user.specialization ? user.specialization.id : null,
      status: user.status
    });
    // Marcar todos los campos como "touched" para que se consideren válidos
    Object.keys(this.userForm.controls).forEach(field => {
      const control = this.userForm.get(field);
      control?.markAsTouched({ onlySelf: true });
      control?.markAsDirty({ onlySelf: true });
    });
  }

  getSpecializations(): void {
    this.userService.getSpecializacionsDoctor().subscribe(
      data => {
        this.specializations = data;
        console.log('Specializations', data);
        if (this.user) {
          this.setFormValues(this.user);
        }
      },
      error => {
        console.error('Error fetching specializations', error);
      }
    );
  }

  onSubmit(): void {
    if (this.userForm.valid) {
      const formData = { ...this.userForm.value };
      if (formData.specialization === null) {
        delete formData.specialization;
      }
      console.log('Form data before sending:', formData); // Agrega esta línea para depurar
      this.userService.updateUser(this.user.id, formData).subscribe(
        response => {
          console.log('User updated successfully', response);
          this.sharingDataService.onScheduleUpdate.emit();
          this.userForm.reset();
          Swal.fire({
            icon: 'success',
            title: 'Usuario actualizado',
            text: 'El usuario ha sido actualizado exitosamente.'
          });
        },
        error => {
          console.error('Error updating user', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error || 'Hubo un error al actualizar el usuario.' // Mostrar el mensaje de error del backend
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