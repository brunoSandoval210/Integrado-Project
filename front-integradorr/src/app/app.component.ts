import { Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/layout/navbar/navbar.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { AuthService } from './services/auth.service';
import { SliderComponent } from './components/layout/slider/slider.component';
import { SharingDataService } from './services/sharing-data.service';
import { BodyComponent } from './components/layout/body/body.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,RouterModule,NavbarComponent,FooterComponent,SliderComponent,BodyComponent],
  providers: [],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front-integradorr';
  constructor(public authService: AuthService,
    private sharingDataService: SharingDataService
  ) {}

  isSideNavCollapsed = false;
  screenWidth = 0;

  onToggleSideNav():void{
    this.sharingDataService.onToggleSideNav.emit({
      collapse: this.isSideNavCollapsed,
      screenWidth: this.screenWidth
    });
  }

}
