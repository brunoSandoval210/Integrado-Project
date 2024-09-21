import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../model/user';
import { SharingDataService } from '../../../services/sharing-data.service';
import Swal from 'sweetalert2';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  user:User;

  constructor(
    private sharingDataService:SharingDataService
  ) {
  this.user = new User();
  }

  onSubmit() {
    if(!this.user.username || !this.user.password) {
      Swal.fire(
        'Error en la validacion',
        'El email y la contraseña son obligatorios',
        'error'
      )
      return;
    } else{
      this.sharingDataService.handlerLoginEventEmitter.emit({
        username:this.user.username,
        password:this.user.password
      });
      // this.user = new User();
    }
  }
}
