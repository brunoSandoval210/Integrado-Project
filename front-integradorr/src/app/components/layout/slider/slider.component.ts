import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { AuthService } from '../../../services/auth.service';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { SharingDataService } from '../../../services/sharing-data.service';
import { navbarData } from './nav-data';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss']
})
export class SliderComponent implements OnInit, OnDestroy {
  constructor(
    public authService: AuthService,
    private sharingDataService: SharingDataService,
    private router: Router
  ) {}

  screenWidth = 0;
  collapse = false;
  filteredNavbarData: { routerLink: string; icon: string; label: string; roles: string[] }[] = [];
  private userSubscription!: Subscription;

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
    this.userSubscription = this.authService.user$.subscribe(user => {
      if (user) {
        this.filterNavbarData();
      }
    });
    this.filterNavbarData();
  }

  ngOnDestroy(): void {
    // Desuscribirse para evitar fugas de memoria
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }

  get role(): string {
    const storedLoginData = sessionStorage.getItem('login');
    if (storedLoginData) {
      const userData = JSON.parse(storedLoginData);
      return userData.role.name;
    }
    return this.authService.user.role;
  }

  filterNavbarData() {
    const storedLoginData = sessionStorage.getItem('login');
    if (storedLoginData) {
      const userData = JSON.parse(storedLoginData);
      this.filteredNavbarData = navbarData.filter(item =>
        item.roles.length === 0 || item.roles.includes(userData.role.name)
      );
    } else {
      this.filteredNavbarData = [];
    }
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
