import { Routes } from "@angular/router";
import { DashboardComponent } from "./features/dashboard/dashboard.component";
import { PatientDetailsComponent } from "./features/patient-details/patient-details.component";
import { PatientAddEditComponent } from "./features/patient-add-edit/patient-add-edit.component";
import { WelcomeComponent } from "./features/welcome/welcome.component";

export const routes: Routes = [
    {path: 'login', component: WelcomeComponent, pathMatch: 'full'},
    {path: 'login/callback', component: DashboardComponent, pathMatch: 'full'},
    {path: 'dashboard', component: DashboardComponent, pathMatch: 'full'},
    {path: 'patient/:id/edit', component:PatientAddEditComponent, pathMatch: 'full'},
    {path: 'patient/:id', component:PatientDetailsComponent, pathMatch: 'full'},
    {path: 'patient', component: PatientAddEditComponent, pathMatch: 'full'},
    {path: '', redirectTo:'/login', pathMatch: 'full'},
]
