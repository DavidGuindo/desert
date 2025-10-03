import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { RegisterComponent } from './components/register/register.component';
import { ServicesComponent } from './components/services/services.component';

export const routes: Routes = [
    { path: '', component: DashboardComponent },      
    { path: 'dashboard', component: DashboardComponent },      
    { path: 'servicios', component: ServicesComponent },      
    { path: 'login', component: LoginComponent }, 
    { path: 'register', component: RegisterComponent }, 
];
