import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { RegisterComponent } from './auth/register/register.component';
import { LoginComponent } from './auth/login/login.component';
import { DashboardComponent } from './Profile/dashboard/dashboard.component';
import { AddTripComponent } from './Profile/add-trip/add-trip.component';
import { ManageTripComponent } from './Profile/manage-trip/manage-trip.component';
import { AddMembersComponent } from './Profile/add-members/add-members.component';
import { authGuard } from './auth/auth.guard';
import { TripSummaryComponent } from './Profile/trip-summary/trip-summary.component';

const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'dashboard', component: DashboardComponent ,canActivate: [authGuard]},
  { path: 'add-trip', component: AddTripComponent,canActivate: [authGuard] },
  { path: 'addMember', component:AddMembersComponent,canActivate: [authGuard] },
  { path: 'manageTrip/:tripId', component: ManageTripComponent,canActivate: [authGuard] },
  { path: 'addMember/:tripId', component: AddMembersComponent,canActivate: [authGuard] },
  { path: 'tripSummary/:tripId', component: TripSummaryComponent ,canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
