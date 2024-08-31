import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { SlideUserComponent } from '../slide-user/slide-user.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'navbar-user',
  standalone: true,
  imports: [SlideUserComponent,RouterModule],
  templateUrl: './navbar-user.component.html',
  styleUrl: './navbar-user.component.scss'
})
export class NavbarUserComponent{
  showSlider:boolean=false;
  showSliderUser:boolean=false;

  constructor(
    private authService:AuthService,
    private router:Router
  ) { 

  }

  showSliderEvent(){
    this.showSlider=!this.showSlider;
  }

  showSliderUserEvent(){
    this.showSliderUser=!this.showSliderUser;
  }

  handlerLogout(){
    this.authService.logout();
    this.router.navigate(['/home']);
  }

  get admin(){
    return this.authService.isAdmin();
  }

  get doctor(){
    return this.authService.isDoctor();
  }

  get login(){
    return this.authService.user;
  }
}
