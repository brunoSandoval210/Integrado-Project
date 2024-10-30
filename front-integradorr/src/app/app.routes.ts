import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { DoctorProfileComponent } from './components/doctor/doctor-profile/doctor-profile.component';
import { PatientProfileComponent } from './components/client/patient-profile/patient-profile.component';
import { AdminProfileComponent } from './components/admin/admin-profile/admin-profile.component';
import { LoginComponent } from './components/auth/login/login.component';
import { RegisterComponent } from './components/auth/register/register.component';
import { DoctorGuard } from './guards/doctor.guard';
import { PatientGuard } from './guards/client.guard';
import { AdminGuard } from './guards/admin.guard';
import { HorariosComponent } from './components/admin/horarios/horarios.component';
import { UsuariosComponent } from './components/admin/usuarios/usuarios.component';
export const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'doctor-profile', component: DoctorProfileComponent,canActivate: [DoctorGuard] },
  { path: 'patient-profile', component: PatientProfileComponent,canActivate: [PatientGuard] },


  //*********Rutas para el admin************
  { path: 'admin-profile', component: AdminProfileComponent, canActivate: [AdminGuard] },
  { path: 'admin/horarios', component:HorariosComponent, canActivate: [AdminGuard]},
  { path: 'admin/usuarios', component:UsuariosComponent, canActivate: [AdminGuard]},
  { path: 'login', component:LoginComponent},
  { path: 'register', component:RegisterComponent}
];

// @NgModule({
//   imports: [RouterModule.forRoot(routes)],
//   exports: [RouterModule]
// })
// export class AppRoutingModule { }