import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { SharingDataService } from '../../../services/sharing-data.service';
import { SideNavToggle } from '../../../models/buttons';
import { FooterComponent } from '../footer/footer.component';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-body',
  standalone: true,
  imports: [RouterModule, CommonModule,FooterComponent],
  templateUrl: './body.component.html',
  styleUrl: './body.component.scss'
})
export class BodyComponent implements OnInit {
  constructor(
    private sharingData: SharingDataService,
    private authService: AuthService
  ) { }

  collapsed = false;
  screenwidth = 0;


  ngOnInit(): void {
    this.sharingData.onToggleSideNav.subscribe((toggle: SideNavToggle) => {
      this.collapsed = toggle.collapse;
      this.screenwidth = toggle.screenWidth;
    });
  }

  getBodyClass(): string {
    if (!this.authService.isAuthenticated()) {
      return 'body-home'; // Usuario no autenticado
    }
    return this.collapsed ? 'body-trimmed' : 'body'; // Autenticado, depende de 'collapsed'
  }
}
