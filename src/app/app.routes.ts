import { Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { RegisterComponent } from './register/register.component';
import { ServicesComponent } from './services/services.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },      
    { path: 'dashboard', component: DashboardComponent },      
    { path: 'servicios', component: ServicesComponent },      
    { path: 'login', component: LoginComponent }, 
    { path: 'register', component: RegisterComponent }, 
];
