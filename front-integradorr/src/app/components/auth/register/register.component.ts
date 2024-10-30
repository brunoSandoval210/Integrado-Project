import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../../services/user.service';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  standalone: true,
  imports: [FormsModule],  
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
  name: string = '';
  lastname: string = '';
  dni: string = '';
  email: string = '';
  password: string = '';

  constructor(private userService: UserService, private router: Router) {}

  onSubmit() {
    const user = {
      name: this.name,
      lastname: this.lastname,
      dni: this.dni,
      email: this.email,
      password: this.password
    };

    this.userService.createUser(user).subscribe(
      response => {
        console.log('Registration successful', response);
        this.router.navigate(['/login']); // Redirige a la página de login después del registro
      },
      error => {
        console.error('Registration failed', error);
        // Maneja el error de registro aquí
      }
    );
  }
}