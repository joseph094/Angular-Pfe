import { Injectable } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from './services/auth.service';
@Injectable()
export class AuthGuardService implements CanActivate {
  constructor(public auth: AuthService, public router: Router) {}
  canActivate(): boolean {
    if (!(this.auth.isTokenExpired()) ){
      // logged in so return true
      console.log("Logged IN");
      return true;
    }

    // not logged in so redirect to login page with the return url
    this.auth.removetoken();
    this.router.navigate(['/home']);
    return true;
  }

  }
