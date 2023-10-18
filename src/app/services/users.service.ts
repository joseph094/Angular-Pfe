import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http :HttpClient) { }
//  Appel à l'Api modifier utilisateur 
modifieruser(id:number,user:any){
  return this.http.patch("api/users/"+id,user);

}
// Appel à l'Api retourner les offres d'un utilisateur 
getoffres(id:number){
  return this.http.get("api/offre/user/"+id)
}
// Appel à l'Api retourner les commandes d'un utilisateur 

getcommandes(id:number){
  return this.http.get("api/commande/user/"+id)
}
//Appel à l'Api remplir portefeuille 
remplir(id:number, data:any){
  return this.http.post("api/portefeuille/remplir/"+id,data);
}


}
