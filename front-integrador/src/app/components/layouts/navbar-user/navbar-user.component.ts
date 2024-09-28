import { Component, OnInit } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { NavbarUserResponsiveComponent } from './navbar-user-responsive/navbar-user-responsive.component';
import { SharingDataService } from '../../../services/sharing-data.service';

@Component({
  selector: 'navbar-user',
  standalone: true,
  imports: [RouterModule,NavbarUserResponsiveComponent],
  templateUrl: './navbar-user.component.html',
  styleUrl: './navbar-user.component.scss'
})
export class NavbarUserComponent implements OnInit{
  showSlider:boolean=false;
  showSliderUser:boolean=false;

  constructor(
    private authService:AuthService,
    private router:Router,
    private sharingDataService:SharingDataService
  ) { 

  }

  ngOnInit(): void {
    // this.login();
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


  get login(){
    return this.authService.user;
  }

  setOpen(){
    this.sharingDataService.popperUpdateUserEventEmitter.emit();
  }

}
