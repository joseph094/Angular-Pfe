import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { UsersService } from '../services/users.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { OffreComponent } from '../offre/offre.component';
import { OffreService } from '../services/offre.service';
import { PortefeuilleComponent } from '../portefeuille/portefeuille.component';
import { SharedServiceService } from 'src/app/service/shared-service.service';
import { MatSnackBar } from '@angular/material/snack-bar';



@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  offres: any;
  portedevise: any;
  commandes: any;
  name = ['TND', 'BTC', 'ETH', 'LTC']
  userId: any;

  data = new Array({
    price: 0, name: ''
  });

  currencies = {}


  selectedHighColorP = '#fb7171';
  selectedHighColorC = '#51cc8b';


  array;
  pricetnd;
  color;

  constructor(private userservice: UsersService,
    private auth: AuthService,
    public dialog: MatDialog,
    private offreservice: OffreService,
    private shared: SharedServiceService,
    private mat: MatSnackBar
  ) { this.loadData(); }

  ngOnInit(): void {
    const m = localStorage.getItem('id');
    var id = Number(m);
    this.userId = id;
    //Récuperation les commandes de cet utilisateur 
    this.userservice.getcommandes(id).subscribe(res => { this.commandes = res, console.log(this.commandes) }, err => console.log(err));
    this.userservice.getoffres(id).subscribe(res => { console.log(res), this.offres = res }, err => console.log(err))
    this.auth.getportefeuille(id).subscribe(data => {
      this.portedevise = data
      console.log(this.portedevise)
    })
    //Appel à la Web Socket et Récuperation des données souhaitées 
    this.shared.connectWS().subscribe((data: any) => {
      const payload = Object(data);
      if (payload[2] == 'ticker') {
        const currency = payload[3];

        const name = currency.split('/')[0];
        const row = this.currencies[name];
        /* this.currencies.btc*/

        const chng = (((+payload[1]?.c[0] - +payload[1]?.o[1]) / +payload[1]?.o[1]) * 100).toFixed(2);
        if (+chng < 0) { this.color = this.selectedHighColorP; }
        else {
          this.color = this.selectedHighColorC;
        }
        this.currencies[name] = {
          price: (+payload[1]?.a[0] * this.pricetnd).toFixed(2),
          name, change: chng, color: this.color
        }

        /*this.currencies={btc:{ price:50000 , name : BTC}  */

        console.log(payload)
      }
    });

  }
  //Récuperation de les devises de sa portefeuille  
  GetPortefeuille() {
    this.auth.getportefeuille(this.userId).subscribe(data => {
      this.portedevise = data
      console.log(this.portedevise)
    })

  }
  //Vérifier si l'offre en cours ou valide pour retourner la classe souhaitée
  getRowColor(offre: any) {
    if (offre.status === 'valide') {
      return "label label-success";
    } else return "label label-warning";

  }
  //retourner la statut de l' offre  
  getStatus(offre: any) {
    if (offre.status === 'valide') {
      return false
    } else {
      return true
    }
  }
  //Ouvrir dialog pour modifier l' offre 
  openDialog(offre: any): void {
    const dialogRef = this.dialog.open(OffreComponent, {
      width: "350px",
      height: "425px",
      data: offre
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
  //Supprimer offre 
  delete_offre(offreido: number) {
    if (confirm("Êtes-vous sûr de vouloir supprimer cette offre")) {
      this.offreservice.delete_offre(offreido).subscribe(
        res => {
          console.log(res), this.get_offres(),
          this.mat.open('Offre supprimée avec succés ', 'Done', {
            duration: 3000,
            verticalPosition: 'bottom',
            panelClass: ['blue-snackbar']
          })
        },
        err => console.log(err)
      )
    }
  }
  //Retourner les offres de cet utilisateur 
  get_offres() {
    this.userservice.getoffres(this.userId).subscribe(res => { console.log(res), this.offres = res }, err => console.log(err))
  }
  //ouvrir dialog pour remplir portefeuille 
  openRemp() {
    const dialogRef = this.dialog.open(PortefeuilleComponent, {
      width: "350px",
      height: "250px",
      data: this.userId
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      this.GetPortefeuille();

    });
  }
  //Récuperation des données de l'Api kraken 
  async loadData() {
    this.array = await this.shared.getapi().toPromise();
    this.pricetnd = this.array.usd.tnd;
  }


}
