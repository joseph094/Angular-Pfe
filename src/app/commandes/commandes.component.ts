import { Component, OnInit } from '@angular/core';
import { OffreService } from '../services/offre.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { CommandeComponent } from './commande/commande.component';

@Component({
  selector: 'app-commandes',
  templateUrl: './commandes.component.html',
  styleUrls: ['./commandes.component.css']
})
export class CommandesComponent implements OnInit {

  offres: any;
  commande: any;
  error: any;
  id: number;

  constructor(private offeservice: OffreService, public dialog: MatDialog) { }

  ngOnInit(): void {
    const m = localStorage.getItem('id');
    var id = Number(m);
    this.id = id;
   //Retourner la liste des offres dispponibles
    this.offeservice.get_offres_dispo().subscribe(
      res => {
        console.log(res)
        this.offres = res
      },
      err => console.log(err)
    )
  }
  //ouvrir interface d'achat 
  openDialog(): void {
    const dialogRef = this.dialog.open(CommandeComponent, {
      width: "60%",
      height: "500px",
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  // Acheter Offre {paremeters Id de client connecté , Id d'offre choisie }
  acheterOffre(iduser: number, idoffre: number) {
    if (confirm("Vous etes sure que vous voulez acheter cette offre ")) {
      this.offeservice.acheterOffre(iduser, idoffre).subscribe(
        res => {
          this.commande = res
          console.log(this.commande)
          const dialogRef = this.dialog.open(CommandeComponent, {
            width: "40%",
            height: "500px",
            data: this.commande
          });
          this.offeservice.get_offres_dispo().subscribe(res => {
            console.log(res)
            this.offres = res
          })

        },
        err => {
          this.error = err.error.message
          console.log(this.error)

        }
      )
    }
  }


  }

