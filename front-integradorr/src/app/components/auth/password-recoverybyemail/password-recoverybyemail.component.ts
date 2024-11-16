import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

@Component({
  selector: 'app-password-recoverybyemail',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './password-recoverybyemail.component.html',
  styleUrl: './password-recoverybyemail.component.scss'
})
export class PasswordRecoverybyemailComponent {
  recoveryForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private router: Router
  ) {
    this.recoveryForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  onSubmit(): void {
    if (this.recoveryForm.invalid) {
      Swal.fire('Error', 'Por favor ingrese un correo electrónico válido.', 'warning');
      return;
    }

    const { email } = this.recoveryForm.value;

    this.isLoading = true;

    this.authService.sendEmailForRecoveryPassword(email).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Correo enviado',
          text: 'Se ha enviado un correo electrónico con instrucciones para recuperar tu contraseña.'
        });
        this.router.navigate(['/login']);
      },
      error: (err) => {
        console.error('Error sending recovery email:', err);
        Swal.fire('Error', err.error?.message || 'No se pudo enviar el correo electrónico.', 'error');
        this.isLoading = false;

      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
