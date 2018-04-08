import {TickerData} from "../models/TickerData";
import {Injectable} from '@angular/core';
import * as oauth from 'oauth';
import {secrets} from "../../environments/secrets";
import {environment} from "../../environments/environment";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';

@Injectable()
export class TradeKingService {
  api_consumer: any;
  tickerSymbol: string;
  currentData: TickerData;

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

  updateTickerSymbol(tickerSymbol: string): void {
    this.tickerSymbol = tickerSymbol;
  }

  getStockData(): Observable<any> {
    return Observable.create(observer => {
      this.api_consumer.get(
        secrets.auth.api_url + '/market/ext/quotes.json?symbols=' + this.tickerSymbol,
        secrets.auth.access_token,
        secrets.auth.access_secret,
        (error, data, response) => {
          if (error) observer.error(error);
          let json = JSON.parse(data);
          this.currentData = this.convertJSONData(json);
          observer.next(this.currentData);
        }
      );
    });
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
