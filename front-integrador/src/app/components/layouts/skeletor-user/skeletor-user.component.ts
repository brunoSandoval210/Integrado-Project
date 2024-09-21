import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarUserComponent } from '../navbar-user/navbar-user.component';
import { SlideUserComponent } from '../slide-user/slide-user.component';
import { FooterUserComponent } from '../footer-user/footer-user.component';
import { SharingDataService } from '../../../services/sharing-data.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../model/user';
import { UserService } from '../../../services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-skeletor-user',
  standalone: true,
  imports: [
    NavbarUserComponent,
    SlideUserComponent,
    RouterModule,
    FooterUserComponent],
  templateUrl: './skeletor-user.component.html',
  styleUrl: './skeletor-user.component.scss'
})
export class SkeletorUserComponent implements OnInit {
  users: User[] = [];

  constructor(
    private sharingDataService: SharingDataService,
    private authService: AuthService,
    private userService: UserService,
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.handlerLogin();
    this.registerUser();
  }

  handlerLogin() {
    this.sharingDataService.handlerLoginEventEmitter.subscribe(({ username, password }) => {
      this.authService.loginUser({ username, password }).subscribe({
        next: response => {
          const token = response.token; // Access the token from the correct property
          const payload = this.authService.getPayload(token);
          const user = { username: [payload.sub] };
          const login = {
            user: user,
            isAuth: true,
            isAdmin: payload.isAdmin,
            isDoctor: payload.isDoctor
          }
          this.authService.token = token;
          this.authService.user = login;
          this.router.navigate(['/mis-citas']);
        },
        error: error => {
          if (error.status == 401) {
            Swal.fire('Error en el login',error.error.message,'error');
          } else {
            throw error;
          }
        }
      })
    }
    )
  }
  registerUser() {
    this.sharingDataService.registerUserEventEmitter.subscribe(({ name, lastname, dni, email, password }) => {
      this.userService.createUser({ name, lastname, dni, email, password }).subscribe({
        next: response => {
          Swal.fire('Registro exitoso', 'Usuario registrado correctamente', 'success');
          this.router.navigate(['/login']);
        },
        error: error => {
          if (error.status == 400) {
            Swal.fire('Error en el registro',error.error.error || 'Error desconocido','error');
            console.log(error.error.error);
          }else {
            throw error;
          }
        }
      })
    }
    )
  }
}
