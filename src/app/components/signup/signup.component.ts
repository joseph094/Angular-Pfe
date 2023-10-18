import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  constructor(private auth: AuthService, private router: Router) { }
  registerUserData = {
    firstName: '',
    lastName: '',
    email: '',
    password: ''
  }
  error = '';
  confirmPassword = '';
  ngOnInit(): void {
  }
  //Inscription utilisateur 
  RegisterUser() {
    this.auth.RegisterUser(this.registerUserData).

      subscribe(res => {
        console.log(res)

        this.router.navigate(['/signin'])
      },

        err => {
          console.log(err),
          this.error = "Email Existant"
        })
  }


//Vérifier  la répétition de mot de passe 
  RepeatPass() {
    if (this.registerUserData.password === this.confirmPassword) {
      return true;
    } else {
      return false;
    }
  }
  //verifier si  le formulaire est vide  
  verifychamps(){
    if(this.registerUserData.lastName===''||this.registerUserData.firstName===''||this.registerUserData.email===''||this.registerUserData.password===''){
      return true;
    }else {
      return false ;
    }
  } 
  //Vérifier la validation d Email 
  validateEmail(email) {
    const regularExpression = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return regularExpression.test(String(email).toLowerCase());
   }

}
