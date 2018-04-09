import { TradeKingMessageService } from "./tradeKingMessage.service";
import {TickerData} from "../models/TickerData";
import {Injectable} from '@angular/core';
import * as oauth from 'oauth';
import {secrets} from "../../environments/secrets";
import {environment} from "../../environments/environment";
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import { StorageService } from "./storage.service";

@Injectable()
export class TradeKingService {
  private api_consumer: any;
  private tickerSymbol: string;
  private currentData: TickerData;

  constructor(private messageService: TradeKingMessageService,
              private storageService: StorageService) {
    this.tickerSymbol = storageService.load('ticker') || 'aapl';
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

  sendMessage(message: any): void {
    this.messageService.sendMessage(message);
  }

  clearMessage(): void {
    this.messageService.clearMessage();
  }

  ngOnInit() {}

  updateTickerSymbol(tickerSymbol: string): void {
    this.tickerSymbol = tickerSymbol;
    this.getStockData();
    this.storageService.store("ticker", this.tickerSymbol);
  }

  getTickerSymbol(): string {
    return this.tickerSymbol;
  }

  getStockData(): void {
    this.api_consumer.get(
      secrets.auth.api_url + '/market/ext/quotes.json?symbols=' + this.tickerSymbol,
      secrets.auth.access_token,
      secrets.auth.access_secret,
      (error, data, response) => {
        this.currentData = this.convertJSONData(JSON.parse(data));
        this.sendMessage(this.currentData);
      }
    );
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
