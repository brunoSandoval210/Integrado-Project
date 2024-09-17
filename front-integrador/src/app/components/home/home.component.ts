import { Component } from '@angular/core';
import { HomeImgComponent } from './home-img/home-img.component';
import { HomeCardsComponent } from './home-cards/home-cards.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [HomeImgComponent,HomeCardsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss'
})
export class HomeComponent {

}
