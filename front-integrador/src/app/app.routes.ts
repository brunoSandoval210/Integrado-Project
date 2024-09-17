import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SkeletorUserComponent } from './components/layouts/skeletor-user/skeletor-user.component';
import { LoginComponent } from './components/auth/login/login.component';
import { authGuard } from './guards/auth.guard';
import { AppointmentsBookedComponent } from './components/users/appointments-booked/appointments-booked.component';
import { ForbiddenComponent } from './components/auth/forbidden/forbidden.component';
import { RegisterComponent } from './components/auth/register/register.component';

export const routes: Routes = [
    {
        path:'',
        pathMatch:'full',
        redirectTo:'home'
    },
    {
        path:'',
        component:SkeletorUserComponent,
        children:[
            {path:'home',component:HomeComponent},
            {path:'login',component:LoginComponent},
            {path:'mis-citas',component:AppointmentsBookedComponent},
            {path:'register',component:RegisterComponent}
            // {path:'client',component:HomeClientComponent,canActivate:[authGuard]}
        ]
    },
    {
        path:'forbidden',
        component:ForbiddenComponent
    },
];
