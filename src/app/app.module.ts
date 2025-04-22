import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import { LoginComponent } from './auth/login/login.component';
import { RegisterComponent } from './auth/register/register.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from './materia/material.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { DashboardComponent } from './Profile/dashboard/dashboard.component';
import { MatToolbarModule} from '@angular/material/toolbar';
import { AddTripComponent } from './Profile/add-trip/add-trip.component';
import { ManageTripComponent } from './Profile/manage-trip/manage-trip.component';
import { AddMembersComponent } from './Profile/add-members/add-members.component';
import { TripSummaryComponent } from './Profile/trip-summary/trip-summary.component'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    DashboardComponent,
    AddTripComponent,
    ManageTripComponent,
    AddMembersComponent,
    TripSummaryComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    MaterialModule,
    HttpClientModule,
    MatSnackBarModule,
    MatToolbarModule,
    FormsModule
  ],
  providers: [
    provideAnimationsAsync()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
