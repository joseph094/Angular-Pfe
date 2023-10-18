import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { FooterComponent } from './components/footer/footer.component';
import { SigninComponent } from './components/signin/signin.component';
import { SignupComponent } from './components/signup/signup.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { OffresComponent } from './offres/offres.component';
import { CommandesComponent } from './commandes/commandes.component';
import { ProfilComponent } from './profil/profil.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SharedServiceService } from './service/shared-service.service';
import { SidenavComponent } from './sidenav/sidenav.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatDialogModule} from '@angular/material/dialog';
import { CommandeComponent } from './commandes/commande/commande.component';
import { OffreComponent } from './offre/offre.component';
import { PortefeuilleComponent } from './portefeuille/portefeuille.component';
import { AuthGuardService } from './auth-guard.service';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { AuthinterceptorService } from './service/authinterceptor.service';





@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    FooterComponent,
    SigninComponent,
    SignupComponent,
    OffresComponent,
    CommandesComponent,
    ProfilComponent,
    DashboardComponent,
    SidenavComponent,
    CommandeComponent,
    OffreComponent,
    PortefeuilleComponent,


  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    MDBBootstrapModule.forRoot(),
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MatDialogModule,
MatSnackBarModule    
    
  ],
  providers: [SharedServiceService,AuthGuardService,{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthinterceptorService,
    multi: true
  }
  ],
  
  bootstrap: [AppComponent]
})
export class AppModule { }
