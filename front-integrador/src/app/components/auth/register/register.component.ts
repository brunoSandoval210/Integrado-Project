import { Component } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../../model/user';
import { SharingDataService } from '../../../services/sharing-data.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  user:User;
  errors:any = {};
  constructor(private sharingDataService:SharingDataService) {
    this.user = new User();
  }

  onRegister(userForm:NgForm) {
   
      this.sharingDataService.registerUserEventEmitter.emit(this.user);
    
  }
}
