import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { first } from 'rxjs/operators';
import { Router } from '@angular/router';
import { promise } from 'selenium-webdriver';


@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.css']
  
})
export class SigninComponent implements OnInit {
 error:any;
  CurrentUser:   {
    id:'',
    firstName:'',
    lastName:'',
    email:''
  }
 LoginUserData={
   email:'',
   password:''
 }


 constructor(private auth : AuthService, private router:Router) { }


 ngOnInit(): void {
 }
 //Connexion de l' utilisateur
 LoginUser(){
  this.auth.LoginUser(this.LoginUserData).pipe(first()).subscribe(res=>
   {console.log(res)
    this.router.navigate(['/dashboard'])
   },
   err=>{
     console.log(err)
     this.error="veuillez vérifier votre login et mot de passe "
   }
   )

}
}
