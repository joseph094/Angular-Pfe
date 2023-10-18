import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import * as bcrypt from 'bcrypt';


@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.css']
})
export class ProfilComponent implements OnInit {
  public portedevise :any;
  name=['TND','BTC','ETH','LTC']
  CurrentUser ={
    id:0,
    firstName:'',
    lastName:'',
    email:'',
    password:'',
  }
  message:string;

  constructor( private auth : AuthService , private userservice:UsersService) { }

  ngOnInit(): void {
    //Recuperer Id a partir de local storage 
    const m = localStorage.getItem('id');
    var id = Number(m);
    this.auth.getportefeuille(id).subscribe(data=>{this.portedevise =data
    console.log(this.portedevise)
    });
   //Recuperation des données de token 
    this.auth.getuser(id).subscribe(res=>{
      console.log(res)
      this.CurrentUser=Object(res);
    })
  }
  //Modifier Utilisateur 
  modifieruser(id:number,user:any){
    this.userservice.modifieruser(id,user).subscribe(
      res=>{console.log(res),this.message="Votre profil modifié avec succès"},
      err=>console.log(err)
    )
  }
   



}
