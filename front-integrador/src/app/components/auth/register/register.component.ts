import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { User } from '../../../model/user';
import { SharingDataService } from '../../../services/sharing-data.service';
import { last } from 'rxjs';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user:User;

  constructor(private sharingDataService:SharingDataService) {
    this.user = new User();
  }

  onRegister() {
    this.sharingDataService.registerUserEventEmitter.emit({
      name:this.user.name,
      lastname:this.user.lastname,
      dni:this.user.dni,
      email:this.user.email,
      password:this.user.password
    });
  }
}
