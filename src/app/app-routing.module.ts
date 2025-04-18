import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './Profile/dashboard/dashboard.component';
import { AddTripComponent } from './Profile/add-trip/add-trip.component';
import { ManageTripComponent } from './Profile/manage-trip/manage-trip.component';
import { AddMembersComponent } from './Profile/add-members/add-members.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'add-trip', component: AddTripComponent },
  { path: 'addMember', component:AddMembersComponent },
  { path: 'manageTrip/:tripId', component: ManageTripComponent },
  { path: 'addMember/:tripId', component: AddMembersComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
