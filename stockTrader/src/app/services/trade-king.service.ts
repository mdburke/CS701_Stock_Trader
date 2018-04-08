import {TickerData} from "../models/TickerData";
import {Injectable} from '@angular/core';
import * as oauth from 'oauth';
import {secrets} from "../../environments/secrets";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import {Observer} from "rxjs/Observer";
import {MessageService} from "./message.service";

@Injectable()
export class TradeKingService {
  api_consumer: any;
  tickerSymbol: string;
  currentData: TickerData;
  private data: Observable<any>;
  private dataObserver: Observer<any>;

  constructor(private messageService: MessageService) {
    this.tickerSymbol = 'aapl';
    this.api_consumer = new oauth.OAuth(
      environment.urls.trade_king_request,
      environment.urls.trade_king_access,
      secrets.auth.consumer_key,
      secrets.auth.consumer_secret,
      "1.0",
      "http://mywebsite.com/tradeking/callback",
      "HMAC-SHA1"
    );

    this.data = new Observable(observer => {
      this.dataObserver = observer;
    });
  }

  sendMessage(message: any): void {
    this.messageService.sendMessage(message);
  }

  clearMessage(): void {
    this.messageService.clearMessage();
  }

  ngOnInit() {

  }

  updateTickerSymbol(tickerSymbol: string): void {
    this.tickerSymbol = tickerSymbol;
    this.getStockData();
  }

  getStockData(): void {
    this.api_consumer.get(
      secrets.auth.api_url + '/market/ext/quotes.json?symbols=' + this.tickerSymbol,
      secrets.auth.access_token,
      secrets.auth.access_secret,
      (error, data, response) => {
        this.sendMessage(data);
      }
    );
        // console.log("get stock data");

        //
        // let promise = new Promise((resolve, reject) => {
    //     }
    //   )
    // });

    // promise.then(result => {
    //   console.log(result);
    // }).catch(error => {
    //   console.log(error);
    // });

    // let observable = Observable.fromPromise(promise);
    //
    // observable.map(response => {
    //   return response;
    // }).subscribe(result => {
    //   this.dataObserver.next(result);
    // }, error => console.log(error));

    // Observable.create(observer => {
    //   console.log("onNext" + observer);
    // }, observer => {
    //   console.log("onError" + observer);
    // }, observer => {
    //   console.log("onComplete" + observer);
    // });
    // Observable.create(observer => {
    //   this.api_consumer.get(
    //     secrets.auth.api_url + '/market/ext/quotes.json?symbols=' + this.tickerSymbol,
    //     secrets.auth.access_token,
    //     secrets.auth.access_secret,
    //     (error, data, response) => {
    //       if (error) observer.error(error);
    //       let json = JSON.parse(data);
    //       this.currentData = this.convertJSONData(json);
    //       console.log("here");
    //       // observer.next(this.currentData);
    //     }
    //   );
    // }).map(response => {
    //   console.log("here is + " + response);
    // });
  }

  private convertJSONData(json: any): TickerData {
    let quote = json.response.quotes.quote;
    return new TickerData(
      quote.symbol,
      quote.name,
      quote.exch_desc,
      quote.last,
      quote.chg,
      quote.opn,
      quote.vwap,
      quote.adv_21,
      quote.adp_200,
      quote.eps
    );
  }
}
