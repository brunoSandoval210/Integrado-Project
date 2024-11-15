import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { Location } from '@angular/common';


@Component({
  selector: 'app-password-recovery',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './password-recovery.component.html',
  styleUrl: './password-recovery.component.scss'
})
export class PasswordRecoveryComponent implements OnInit {
  changePasswordForm: FormGroup;
  isLoading: boolean = false;
  token: string | null = null;

  constructor(
    private fb: FormBuilder, 
    private authService: AuthService,
    private route: ActivatedRoute,
    private routerDirect: Router,
    private location: Location

  ) {
    this.changePasswordForm = this.fb.group({
      password: ['', [Validators.required, Validators.minLength(8), Validators.pattern('^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d).*$')]],
      validPassword: ['', [Validators.required]],
      token: ['', [Validators.required]],
      code: ['', [Validators.required]]
    });
  }

  ngOnInit(): void {
    this.route.queryParams.subscribe(params => {
      this.token = params['token'];
      if (this.token) {
        this.changePasswordForm.patchValue({ token: this.token });
      }
    });
  }

  onSubmit(): void {
    if (this.changePasswordForm.invalid) {
      Swal.fire('Error', 'Por favor complete todos los campos correctamente.', 'warning');
      return;
    }
  
    const { password, validPassword, token, code } = this.changePasswordForm.value;
  
    if (password !== validPassword) {
      Swal.fire('Error', 'Las contraseñas no coinciden.', 'warning');
      return;
    }
  
    this.isLoading = true;
  
    this.authService.changePassword(password, validPassword, token, code).subscribe({
      next: (response) => {
        Swal.fire({
          icon: 'success',
          title: 'Contraseña cambiada',
          text: 'La contraseña se cambió correctamente.'
        });
        this.location.replaceState('/recover-password');
        this.routerDirect.navigate(['/login']);

      },
      error: (err) => {
        console.error('Error changing password:', err);
        Swal.fire('Error', err.error?.message || 'No se pudo cambiar la contraseña.', 'error');
      },
      complete: () => {
        this.isLoading = false;
      }
    });
  }
  
  
}
