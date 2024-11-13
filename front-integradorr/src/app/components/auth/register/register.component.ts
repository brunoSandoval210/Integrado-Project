import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],  
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  userForm: FormGroup;

  constructor(private userService: UserService, private router: Router, private fb: FormBuilder) {
    this.userForm = this.fb.group({
      name: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]], // Solo letras y espacios
      lastname: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]], // Solo letras y espacios
      dni: ['', [Validators.required, Validators.pattern(/^\d{8}$/)]], // Solo números y 8 dígitos
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]], // Mínimo 8 caracteres, al menos una mayúscula, una minúscula y un número
    });
  }

  onSubmit(): void {
    if (this.userForm.valid) { // Verificar si el formulario es válido
      this.userService.createUser(this.userForm.value).subscribe(
        response => {
          Swal.fire({
            icon: 'success',
            title: 'Registro exitoso',
            text: 'Te has registrado correctamente en la plataforma',
          });
          this.router.navigate(['/login']); // Redirige a la página de login después del registro
        },
        error => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: error.error,
          });
          console.error('Registration failed', error);
        }
      );
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Error',
        text: 'Por favor, complete todos los campos correctamente',
      });
    }
  }
}