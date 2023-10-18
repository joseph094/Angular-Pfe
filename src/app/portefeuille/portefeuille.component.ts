import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OffreService } from '../services/offre.service';
import { UsersService } from '../services/users.service';


@Component({
  selector: 'app-portefeuille',
  templateUrl: './portefeuille.component.html',
  styleUrls: ['./portefeuille.component.css']
})
export class PortefeuilleComponent implements OnInit {
  devises:any = [
    {id:1, name: "TN DINAR "},
    {id:2, name: "BITCOIN"},
    { id:3, name: "ETHERUEM"},
    {id: 4, name: "LITECOIN"},
];
data:any;
message:string;
error:string;
remplirdto={
  deviseId:0,
  quantite:0
}

quantite:0;
selectedBase:{
  idc:0,name:""
};
portedevise:any;

  constructor( private users:UsersService,private offre:OffreService,
    public dialogRef: MatDialogRef<PortefeuilleComponent>,
    @Inject(MAT_DIALOG_DATA) public userId: number) { }

  ngOnInit(): void {
    this.offre.getdevises().subscribe(
      res=>{this.data=res,console.log(this.data)
      }
    )
    
  }
  //Remplir Portefeuille 
  remplir_Portefeuille(){
    this.remplirdto.deviseId=this.selectedBase.idc;
    this.remplirdto.quantite=this.quantite;

    this.users.remplir(this.userId,this.remplirdto).subscribe(
      res=>{this.message="Montant ajouté avec succès " },
      err=>{this.error="Probleme , Essayer de nouveau "}
    )
  }
  getdevises(){
    this.offre.getdevises().subscribe(
      res=>{this.data=res,console.log(this.data)
      }
    )
  }
  base(){
    console.log(this.selectedBase)
  }
}

