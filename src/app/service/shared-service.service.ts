import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject, Observable, Subscription } from 'rxjs';
import { webSocket, WebSocketSubject } from 'rxjs/webSocket';
@Injectable({
  providedIn: 'root'
})
export class SharedServiceService {
  //Api de conversion de dollar vers le dinar Tunisien 
  url = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.json';
  constructor(
    private http: HttpClient) { }
  getapi() {
    return this.http.get(this.url);
  }
  //Connexion sur WebSocket du marché Kraken 
  connectWS() {
    const myWebSocket = webSocket('wss://ws.kraken.com');
    const msg = {
      "event": "subscribe",
      "pair": [
        "XBT/USD",
        "ETH/USD",
        "LTC/USD",
        "BCH/USD"
      ],
      "subscription": {
        "name": "ticker"
      }
    }
    myWebSocket.next(msg);

    return myWebSocket.asObservable()


  }
}
