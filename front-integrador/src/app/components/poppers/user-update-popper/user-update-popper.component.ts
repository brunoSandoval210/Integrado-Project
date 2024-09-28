import { Component} from '@angular/core';
import { SharingDataService } from '../../../services/sharing-data.service';
import { FormsModule, NgForm } from '@angular/forms';
import { User } from '../../../model/user';

@Component({
  selector: 'user-update-popper',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './user-update-popper.component.html',
  styleUrl: './user-update-popper.component.scss'
})
export class UserUpdatePopperComponent {
  user:User;
  errors:any = {};
  constructor(
    private sharingDataService: SharingDataService
  ){
    this.user = new User();
  }

  closeModal() {
    this.sharingDataService.popperUpdateUserEventEmitter.emit();
  }

  onUpdate(userForm:NgForm) {
    this.sharingDataService.updateUserEvenEmitter.emit(this.user);
  }
}
