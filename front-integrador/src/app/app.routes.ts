import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SkeletorUserComponent } from './components/user/skeletor-user/skeletor-user.component';
import { LoginComponent } from './components/auth/login/login.component';

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
            {path:'login',component:LoginComponent}
        ]
    }
];
