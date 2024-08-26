import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../model/user';
import { SharingDataService } from '../../../services/sharing-data.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule],
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
      alert('Por favor, ingrese su usuario y contraseña');
      return;
    } else{
      this.sharingDataService.handlerLoginEventEmitter.emit({
        username:this.user.username,
        password:this.user.password
      });
    }
  }
}
