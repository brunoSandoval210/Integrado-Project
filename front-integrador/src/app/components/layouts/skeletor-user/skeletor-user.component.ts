import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NavbarUserComponent } from '../navbar-user/navbar-user.component';
import { SlideUserComponent } from '../slide-user/slide-user.component';
import { FooterUserComponent } from '../footer-user/footer-user.component';
import { SharingDataService } from '../../../services/sharing-data.service';
import { AuthService } from '../../../services/auth.service';
import { User } from '../../../model/user';

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
    private router: Router
  ) {

  }

  ngOnInit(): void {
    this.handlerLogin();
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
            console.log(error.error.message)
          } else {
            throw error;
          }
        }
      })
    }
    )
  }
}
