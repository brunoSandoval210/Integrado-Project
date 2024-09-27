import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarUserResponsiveComponent } from './navbar-user-responsive.component';

describe('NavbarUserResponsiveComponent', () => {
  let component: NavbarUserResponsiveComponent;
  let fixture: ComponentFixture<NavbarUserResponsiveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarUserResponsiveComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(NavbarUserResponsiveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
