import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarUserComponent } from './layouts/navbar-user/navbar-user.component';
import { SlideUserComponent } from './layouts/slide-user/slide-user.component';
import { FooterUserComponent } from './layouts/footer-user/footer-user.component';
import { SharingDataService } from '../services/sharing-data.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-main-component',
  standalone: true,
  imports: [
            RouterOutlet,
            NavbarUserComponent,
            SlideUserComponent,
            RouterModule,
            FooterUserComponent
  ],
  templateUrl: './main-component.component.html',
  styleUrl: './main-component.component.scss'
})
export class MainComponentComponent implements OnInit{
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
    this.roles();
  }

  handlerLogin() {
    this.sharingDataService.handlerLoginEventEmitter.subscribe(({ username, password }) => {
      this.authService.loginUser({ username, password }).subscribe({
        next: response => {
          const token = response.token;
          const payload = this.authService.getPayload(token);
          const user = { username: [payload.sub] };
          const login = {
            user: user,
            isAuth: true,
            isAdmin: payload.isAdmin,
            isDoctor: payload.isDoctor,
            isPatient: payload.isPatient
          };

          this.authService.token = token;
          this.authService.user = login;

          if(payload.isAdmin){
            this.router.navigate(['/admin-dashboard']);
          } else if(payload.isDoctor){
            this.router.navigate(['/doctor-dashboard']);
          } else {
            this.router.navigate(['/mis-citas']);
          }
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

  roles(){
    console.log(this.authService.getUserRoles());
    return this.authService.getUserRoles();
  }
}
