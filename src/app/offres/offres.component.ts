import { Component, OnInit } from '@angular/core';
import { OffreService } from '../services/offre.service';

@Component({
  selector: 'app-offres',
  templateUrl: './offres.component.html',
  styleUrls: ['./offres.component.css']
})
export class OffresComponent implements OnInit {
  iduser:any;
  error:any;
  message:any;
  selectedQuote:{
    id:0,name:""
  };
  
  selectedBase:{
    id:0,name:""
  };
  devises:any = [
    {id:1, name: "TN DINAR "},
    {id:2, name: "BITCOIN"},
    { id:3, name: "ETHERUEM"},
    {id: 4, name: "LITECOIN"},
];
  data:any = [
    {id:2, name: "BITCOIN"},
    { id:3, name: "ETHERUEM"},
    {id: 4, name: "LITECOIN"},
];
offre = {
  status:"en cours",
  quantite:0,
  valeur:0
}

  constructor(private offreservice:OffreService) { }

  ngOnInit(): void {
    const m = localStorage.getItem('id');
    var id = Number(m);
    this.iduser=id;
  }
//selection de la devise quote selon les options 
selectquote(){
  console.log(this.selectedQuote);
}
//selection de la devise base selon les options 
selectbase(){
  console.log(this.selectedBase);
}
//Lancer Offre
lanceroffre(iduser:number,baseid:number,quoteid:number,offre:any){
   if(offre.quantite==null||offre.valeur==null){
    
    this.error="Valeur ou Quantite Invalide"
   }
   else if(quoteid==baseid){

this.error="Devise Base et Devise Quote faut etre different "
   }

    else{  
  this.offreservice.lancerOffre(iduser,baseid,quoteid,offre).subscribe(
    res=>{console.log(res),this.message="Offre soumise avec succès"},
    err=>{console.log(err)
    this.error=err.error.message
    }
  )
}
}
//Vérifier les champs de la formaulaire 
check(offre:any){
  if(this.selectedBase && this.selectedQuote&&offre.valeur!=0&&offre.quantite!=0){
   return true
  }else{
    return false
  }
}
//définir le formulaire vide
Annuler(offre:any){
  offre.valeur=0;
  offre.quantite=0;
  this.selectedBase={id:0,name:''};
  this.selectedQuote={id:0,name:''}
  
}
}
