import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit() {
    this.authService.loginUser({ username: this.username, password: this.password }).subscribe(
      response => {
        if (response && response.token) {
          this.authService.token = response.token;
          this.redirectUser();
        } else {
          console.error('Invalid login response', response);
          // Maneja el error de login aquí
        }
      },
      error => {
        console.error('Login failed', error);
        if (error.status === 403) {
          alert('Credenciales incorrectas. Por favor, inténtelo de nuevo.');
        } else {
          alert('Error al iniciar sesión. Por favor, inténtelo de nuevo más tarde.');
        }
      }
    );
  }
  redirectUser() {
    const role = this.authService.user.role;
    if (role === 'ROLE_ADMIN') {
      this.router.navigate(['/admin-profile']);
    } else if (role === 'ROLE_DOCTOR') {
      this.router.navigate(['/doctor-profile']);
    } else if (role === 'ROLE_USER') {
      this.router.navigate(['/patient-profile']);
    } else {
      this.router.navigate(['/']); // Redirige a la página principal por defecto
    }
  }

}
