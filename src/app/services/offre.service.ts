import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class OffreService {

  constructor(private http:HttpClient) { }
  //Appel à l'Api de la fonction Lancer Offre
  lancerOffre(iduser:number,quoteid:number,baseid:number,offre:any){
    return this.http.post("api/offre/"+iduser+"/"+quoteid+"/"+baseid,offre)
    
  }
//api de recuperation des offres qui sont en cours
  get_offres_dispo(){
    return this.http.get("api/offre/disponibles")
}
//Appel à l'Api de la fonction Acheter Offre
acheterOffre(iduser:number , idoffre:number){
  return this.http.post("/api/commande/"+iduser+"/"+idoffre,null)
}
//Appel à l'Api modifier Offre
modifier_offre(offre:any){
  return this.http.patch("api/offre/update",offre)
}
//Appel à l'Api supprimer Offre
delete_offre(id:number){
  return this.http.delete("api/offre/"+id);
}
getdevises(){
  return this.http.get("api/devise")
}

}
