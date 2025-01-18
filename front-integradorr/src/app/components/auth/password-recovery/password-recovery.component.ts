import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { CommonModule } from '@angular/common';


@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.scss'
})
export class PasswordRecoveryComponent{
  changePasswordForm: FormGroup;
  isLoading: boolean = false;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private routerDirect: Router
  ) {
    this.changePasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)]],
      validPassword: ['', [Validators.required]],
      code: ['', [Validators.required, Validators.minLength(5)]] 
    }, { validators: this.passwordsMatchValidator });
  }

  passwordsMatchValidator(group: AbstractControl): ValidationErrors | null {
    const password = group.get('password')?.value;
    const validPassword = group.get('validPassword')?.value;
    return password === validPassword ? null : { passwordsMismatch: true };
  }

  ngOnInit(): void {
  }

  onSubmit(): void {
    if (this.changePasswordForm.invalid) {
      Swal.fire('Error', 'Por favor complete todos los campos correctamente.', 'warning');
      return;
    }
  
    const { password, validPassword, code } = this.changePasswordForm.value;
  
    if (password !== validPassword) {
      Swal.fire('Error', 'Las contraseñas no coinciden.', 'warning');
      return;
    }
  
    this.isLoading = true;
  
    this.authService.changePassword(password, validPassword, code).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Contraseña cambiada',
          text: 'La contraseña se cambió correctamente.'
        });
        this.routerDirect.navigate(['/login']);
        // this.location.replaceState('/recover-password');

      },
      error: (err) => {
        console.error('Error changing password:', err);
        Swal.fire('Error', err.error?.message || 'No se pudo cambiar la contraseña.', 'error');
        this.isLoading = false;
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
}
