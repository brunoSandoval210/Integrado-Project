import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../../services/auth.service';
import { SharingDataService } from '../../../../services/sharing-data.service';

@Component({
  selector: 'navbar-user-responsive',
  standalone: true,
  imports: [RouterModule],
  templateUrl: './navbar-user-responsive.component.html',
  styleUrl: './navbar-user-responsive.component.scss'
})
export class NavbarUserResponsiveComponent {
  showConfigUser:boolean=false;

  constructor(
    private authService:AuthService,
    private router:Router,
    private sharingDataService:SharingDataService
  ){

  }

  get login(){
    return this.authService.user;
  }

}
