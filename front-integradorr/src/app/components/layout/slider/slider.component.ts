import { Component, HostListener, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharingDataService } from '../../../services/sharing-data.service';
import { navbarData } from './nav-data';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit {
  constructor(
    public authService: AuthService, 
    private sharingDataService: SharingDataService,
    private router: Router
  ) { }

  screenWidth = 0;
  collapse = false;
  filteredNavbarData: { routerLink: string; icon: string; label: string; roles: string[] }[] = [];

  @HostListener('window:resize', ['$event'])
  onResize(event: any) {
    this.screenWidth = window.innerWidth;
    if (this.screenWidth <= 768) {
      this.collapse = false;
      this.sharingDataService.onToggleSideNav.emit({ collapse: this.collapse, screenWidth: this.screenWidth });
    }
  }

  ngOnInit(): void {
    this.screenWidth = window.innerWidth;
    this.sharingDataService.onToggleSideNav.emit({ collapse: this.collapse, screenWidth: this.screenWidth });
    this.filterNavbarData();
  }

  get role(): string {
    return this.authService.user.role;
  }

  filterNavbarData() {
    this.filteredNavbarData = navbarData.filter(item => item.roles.length === 0 || item.roles.includes(this.role));
  }

  toggleCollapse(): void {
    this.collapse = !this.collapse;
    this.sharingDataService.onToggleSideNav.emit({ collapse: this.collapse, screenWidth: this.screenWidth });
  }

  closeSidenav(): void {
    this.collapse = false;
    this.sharingDataService.onToggleSideNav.emit({ collapse: this.collapse, screenWidth: this.screenWidth });
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}