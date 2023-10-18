import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { JwtHelperService } from "@auth0/angular-jwt";
import { map } from 'rxjs/operators';
import { User } from '../interface/User';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  helper = new JwtHelperService();
  CurrentUser: User = {
    id: 0,
    firstName: '',
    lastName: '',
    email: ''

  }

  constructor(private http: HttpClient, private router: Router) { }
  //appel à l' Api de l'inscription 
  RegisterUser(user: any) {
    return this.http.post<any>("api/auth/register", user)
  }
  //appel à l'Api de a connexion 
  LoginUser(data: any) {
    return this.http.post<any>("api/auth/login", data ).pipe(
      map(res => {
        //decoder token et récuperation des données 
        const decodedtoken = this.helper.decodeToken(res.accessToken);
        this.CurrentUser.id = decodedtoken.id;
        var x = this.CurrentUser.id.toString();
        localStorage.setItem('id', x)
        localStorage.setItem('token', res.accessToken)
        return decodedtoken;

      }))
  }
  //Vérifier si l'utilisateur est connecté 
  LoggedIn() {
    return (!!localStorage.getItem('token')&&!!localStorage.getItem('id'))       
  }
  // Déconnexion 
  LogoutUser() {
    localStorage.removeItem('id')
    return localStorage.removeItem('token'),
      this.router.navigate(['/login'])
  }
  //Récuperation de token 
  gettoken() {
    return localStorage.getItem('token')
  }
  //Récuperer la portefeuille de l 'utilisateur connectée 
  getportefeuille(userId: number) {
    return this.http.get("api/portefeuille/users/" + userId)
  } 
  //Récuperer l'utilisateur selon ID
  getuser(id:number){
    return this.http.get("api/users/"+id)
  }
  isTokenExpired(token?: string): boolean {
    if(!token) token = this.gettoken();
    if(!token) return true;

    const date = this.helper.getTokenExpirationDate(token);
    console.log(date);
    if(date === undefined) return false;
    return !(date.valueOf() > new Date().valueOf());
  }
  removetoken(){
    localStorage.removeItem('token')
    return localStorage.removeItem('id')
  }
}

