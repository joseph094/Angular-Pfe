import { Component, OnInit } from '@angular/core';
import { SharedServiceService } from 'src/app/service/shared-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  data = new Array({
    price: 0, name: ''
  });

  currencies = {}


  selectedHighColorP = '#fb7171';
  selectedHighColorC = '#51cc8b';


  array;
  pricetnd;
  color;
  constructor(private shared: SharedServiceService) { this.loadData(); }

  ngOnInit(): void {
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
  async loadData() {
    this.array = await this.shared.getapi().toPromise();
    this.pricetnd = this.array.usd.tnd;
  }
}
