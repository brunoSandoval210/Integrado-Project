import { Component, OnInit } from '@angular/core';
import { SlideUserComponent } from '../slide-user/slide-user.component';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'navbar-user',
  standalone: true,
  imports: [SlideUserComponent,RouterModule],
  templateUrl: './navbar-user.component.html',
  styleUrl: './navbar-user.component.scss'
})
export class NavbarUserComponent{
  showSlider:boolean=false;

  constructor() { 

  }

  showSliderEvent(){
    this.showSlider=!this.showSlider;
  }
}
