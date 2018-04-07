import { Injectable } from '@angular/core';
import * as oauth from 'oauth';
import {secrets} from "../environments/secrets";
import {environment} from "../environments/environment";
import { Observable } from "rxjs/Observable";
import { of } from 'rxjs/observable/of';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class TradeKingService {
  api_consumer: any;
  tickerSymbol: string;
  currentData: any;

  constructor() {
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
  }

  ngOnInit() {}

  getStockData(): Observable<any> {
    return Observable.create(observer => {
      let data = this.api_consumer.get(
        secrets.auth.api_url + '/market/ext/quotes.json?symbols=' + this.tickerSymbol,
        secrets.auth.access_token,
        secrets.auth.access_secret,
        (error, data, response) => {
          if (error) observer.error(error);
          console.log("callback");
          observer.next(JSON.parse(data));
        }
      );

      return () => {

      }
    });


    // let data = Observable.fromPromise(
    //   this.api_consumer.get(
    //     secrets.auth.api_url + '/market/ext/quotes.json?symbols=' + this.tickerSymbol,
    //     secrets.auth.access_token,
    //     secrets.auth.access_secret,
    //     (error, data, response) => {
    //
    //     }
    //   )
    // );
    //
    // return data;
    // let that = this;
    //
    // console.log("inside get stock data");
    // return this.api_consumer.get(
    //   secrets.auth.api_url + '/market/ext/quotes.json?symbols=' + this.tickerSymbol,
    //   secrets.auth.access_token,
    //   secrets.auth.access_secret,
    //   function(error, data, response) {
    //     console.log("inside get stock data callback");
    //     return new Promise((resolve, reject) => {
    //       if (error) reject(error);
    //       // Parse the JSON data
    //       that.currentData = JSON.parse(data);
    //       resolve(that.currentData);
    //     });
    //   });
  }
}
