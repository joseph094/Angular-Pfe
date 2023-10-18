
import { SignupComponent } from './components/signup/signup.component';
import { SigninComponent } from './components/signin/signin.component';

import { HomeComponent } from './components/home/home.component';
import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CommandesComponent } from './commandes/commandes.component';
import { ProfilComponent } from './profil/profil.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { OffresComponent } from './offres/offres.component';
import { AuthGuardService } from './auth-guard.service';


const routes: Routes = [
  {path:'home',component:HomeComponent},
  {path:'',component:DashboardComponent,canActivate:[AuthGuardService]},
  { path: 'commandes', component: CommandesComponent,canActivate:[AuthGuardService] },
  { path: 'profil', component: ProfilComponent,canActivate:[AuthGuardService] },
  { path: 'dashboard', component: DashboardComponent,canActivate:[AuthGuardService] },
  { path: 'offres', component: OffresComponent,canActivate:[AuthGuardService] },
  { path: 'signin', component: SigninComponent },
  { path: 'signup', component: SignupComponent }


];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
