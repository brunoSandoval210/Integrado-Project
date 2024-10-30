import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/auth/login/login.component';
import { authGuard } from './guards/auth.guard';
import { AppointmentsBookedComponent } from './components/users/appointments-booked/appointments-booked.component';
import { ForbiddenComponent } from './components/auth/forbidden/forbidden.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { MainComponentComponent } from './components/main-component.component';

export const routes: Routes = [
    {
        path: '',
        pathMatch: 'full',
        redirectTo: 'home'
    },
    {
        path: '',
        component: MainComponentComponent,
        children: [
            { path: 'home', component: HomeComponent },
            { path: 'login', component: LoginComponent },
            { path: 'register', component: RegisterComponent },
            {
                path: 'mis-citas',
                component: AppointmentsBookedComponent,
                canActivate: [authGuard],
                data: { roles: ['cliente'] }
            },
            { path: 'forbidden', component: ForbiddenComponent }
        ]
    }
];
