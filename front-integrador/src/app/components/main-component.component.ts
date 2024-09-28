import { Component, OnInit } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { NavbarUserComponent } from './layouts/navbar-user/navbar-user.component';
import { FooterUserComponent } from './layouts/footer-user/footer-user.component';
import { SharingDataService } from '../services/sharing-data.service';
import { AuthService } from '../services/auth.service';
import { UserService } from '../services/user.service';
import { User } from '../model/user';
import Swal from 'sweetalert2';
import { UserUpdatePopperComponent } from './poppers/user-update-popper/user-update-popper.component';

@Component({
  selector: 'app-main-component',
  standalone: true,
  imports: [
            RouterOutlet,
            NavbarUserComponent,
            RouterModule,
            FooterUserComponent,
            UserUpdatePopperComponent
  ],
  templateUrl: './main-component.component.html',
  styleUrl: './main-component.component.scss'
})
export class MainComponentComponent implements OnInit{
  users: User[] = [];
  openConfigUser: boolean = false;

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
    // this.roles();
    this.sharingDataService.popperUpdateUserEventEmitter.subscribe(()=>{
      this.toggleModal();
    });
    this.updateUser();
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
            isPatient: payload.isPatient,
            id: payload.id
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
    this.sharingDataService.registerUserEventEmitter.subscribe((user:User) => {
      this.userService.createUser(user).subscribe({
        next: response => {
          Swal.fire('Registro exitoso', 'Usuario registrado correctamente', 'success');
          this.router.navigate(['/login']);
        },
        error: error => {
          if (error.status == 400) {
            Swal.fire('Error en el registro',error.error.error || 'Error desconocido','error');
          }else {
            throw error;
          }
        }
      })
    }
    )
  }

  updateUser(){
    this.sharingDataService.updateUserEvenEmitter.subscribe((user:User)=>{
      this.userService.updateUser(user).subscribe({
        next: response => {
          Swal.fire('Actualización exitosa', 'Usuario actualizado correctamente', 'success');
          this.openConfigUser = false;
        },
        error: error => {
          if (error.status == 400) {
            Swal.fire('Error en la actualización',error.error.error || 'Error desconocido','error');
          }else {
            throw error;
          }
        }
      })
    });
  }

  // roles(){
  //   return this.authService.getUserRoles();
  // }

  //Cambiar el estado de la variable openConfigUser
  toggleModal(){
    this.openConfigUser = !this.openConfigUser;
  }

  closeModal(){
    this.openConfigUser = false;
  }

}
