import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OffreService } from '../services/offre.service';


@Component({
  selector: 'app-offre',
  templateUrl: './offre.component.html',
  styleUrls: ['./offre.component.css']
})
export class OffreComponent implements OnInit {
  
  devises:any = [
    {idc:1, name: "TN DINAR "},
    {idc:2, name: "BITCOIN"},
    { idc:3, name: "ETHERUEM"},
    {idc: 4, name: "LITECOIN"},
];
  data:any = [
    {idc:2, name: "BITCOIN"},
    { idc:3, name: "ETHERUEM"},
    {idc: 4, name: "LITECOIN"},
];
updateOffre ={
  ido:0,
  valeur:0,
};
messageSucces:string;



  constructor(private offreservice:OffreService,
    public dialogRef: MatDialogRef<OffreComponent>,
    @Inject(MAT_DIALOG_DATA) public offre: any) {}
    
    selectedBase=this.offre.__devibase__
    selectedQuote=this.offre.__devicur__

  ngOnInit(): void {
    
  }
  //Mettre a jour l offre 
  update_offre(){
    this.updateOffre.ido=this.offre.ido;
    this.updateOffre.valeur=this.offre.valeur;
       this.offreservice.modifier_offre(this.updateOffre).subscribe(
      res=>{console.log("Offre a été modifiée avec succès "), this.messageSucces="Offre a été modifiée avec succès "},
      err=>console.log("Porbleme , Essayer de nouveau")
    )
    
  }
}
