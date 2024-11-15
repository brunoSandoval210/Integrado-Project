import { Component } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    FormsModule,
    RouterModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  username: string = '';
  password: string = '';

  constructor(
    private authService: AuthService, 
    private router: Router
  ) {}
  
  onSubmit() {
    this.authService.loginUser({ username: this.username, password: this.password }).subscribe(
      response => {
        if (response && response.token) {
          this.authService.token = response.token;
          Swal.fire({
            icon: 'success',
            title: 'Inicio de sesión exitoso',
            text: 'Bienvenido de nuevo'
          });
          this.redirectUser();
        } else {
          console.error('Invalid login response', response);
          Swal.fire({
            icon: 'error',
            title: 'Error al iniciar sesión',
            text: 'Respuesta de inicio de sesión inválida'
          });
        }
      },
      error => {
        Swal.fire({
          icon: 'error',
          title: 'Error al iniciar sesión',
          text: 'Usuario o contraseña incorrectos'
        });
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
