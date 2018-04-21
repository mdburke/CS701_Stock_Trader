import { TradeKingMessageService } from "./tradeKingMessage.service";
import {TickerData} from "../models/TickerData";
import {Injectable} from '@angular/core';
import * as oauth from 'oauth';
import {secrets} from "../../environments/secrets";
import {environment} from "../../environments/environment";
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/map';
import { StorageService } from "./storage.service";
import { TimerObservable } from "rxjs/observable/TimerObservable";
import { MessageData } from "../models/MessageData";

@Injectable()
export class TradeKingService {
  private api_consumer: any;
  private mainTicker: string;
  private currentData: TickerData;
  private tickerSymbols: string[];
  private stockData: TickerData[];
  private messageData: MessageData;

  constructor(private messageService: TradeKingMessageService,
              private storageService: StorageService) {
    // this.tickerSymbol = storageService.load('ticker') || 'aapl';
    this.mainTicker = storageService.load('mainTicker') || 'aapl';
    this.tickerSymbols = storageService.load('tickers') || ['aapl', 'nvda', 'ibm'];
    this.messageData = new MessageData();
    this.api_consumer = new oauth.OAuth(
      environment.urls.trade_king_request,
      environment.urls.trade_king_access,
      secrets.auth.consumer_key,
      secrets.auth.consumer_secret,
      "1.0",
      "http://mywebsite.com/tradeking/callback",
      "HMAC-SHA1"
    );
    TimerObservable.create(0, 5000)
      .subscribe(() => {
        this.getStockData();
      });
  }

  sendMessage(message: any): void {
    this.messageService.sendMessage(message);
  }

  clearMessage(): void {
    this.messageService.clearMessage();
  }

  getTickerSymbol(): string {
    return this.mainTicker;
  }

  updateTickerSymbol(tickerSymbol: string): void {
    this.mainTicker = tickerSymbol;
    this.messageData.mainTicker = this.mainTicker;
    this.getStockData();
    this.storageService.store("mainTicker", this.mainTicker);
  }

  addSymbols(symbols: string[]) {
    symbols.forEach(symbol => {
      if (this.tickerSymbols.indexOf(symbol) !== -1) {
        this.tickerSymbols.push(symbol);
      }
    });
  }

  async getStockData() {
    // let marketStatus: string = JSON.parse(await this.getMarketStatus());
    await this.getMarketStatus();
    await this.getQuotes();
    this.sendMessage(this.messageData);
  }

  getMarketStatus(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.api_consumer.get(
        secrets.auth.api_url + '/market/clock.json',
        secrets.auth.access_token,
        secrets.auth.access_secret,
        (error, data, response) => {
          if (error !== null) return reject(error);
          data = JSON.parse(data);
          this.messageData.clockData.callTime = data['response']['date'];
          this.messageData.clockData.marketStatus = data['response']['status']['current'];
          this.messageData.clockData.unixTime = data['response']['unixtime'];
          this.messageData.clockData.change_at = data['response']['status']['change_at'];
          this.messageData.clockData.message = data['response']['message'];

          resolve(data);
        }
      )
    });
  }

  getQuotes() {
    return new Promise((resolve, reject) => {
      this.api_consumer.get(
        secrets.auth.api_url + '/market/ext/quotes.json?symbols=' + this.tickerSymbols.join(',') + ',' + this.mainTicker,
        secrets.auth.access_token,
        secrets.auth.access_secret,
        (error, data, response) => {
          if (error !== null) return reject(error);
          let quotes = JSON.parse(data).response.quotes.quote;

          for (let quote of quotes) {
            this.messageData.add(new TickerData(
              quote.symbol,
                quote.name,
                quote.exch_desc,
                quote.last,
                quote.chg,
                quote.opn,
                quote.vwap,
                quote.adv_21,
                quote.adp_200,
                quote.eps,
                quote.pe
            ));
          }

          resolve(data);
        }
      );
    });
  }
  //
  // getQuote() {
  //   return new Promise((resolve, reject) => {
  //     this.api_consumer.get(
  //       secrets.auth.api_url + '/market/ext/quotes.json?symbols=' + this.tickerSymbol,
  //       secrets.auth.access_token,
  //       secrets.auth.access_secret,
  //       (error, data, response) => {
  //         if (error !== null) return reject(error);
  //         this.currentData = this.convertJSONData(JSON.parse(data));
  //         resolve(this.currentData);
  //       }
  //     );
  //   });
  // }
  //
  // private convertJSONData(json: any): TickerData {
  //   let quote = json.response.quotes.quote;
  //   return new TickerData(
  //     quote.symbol,
  //     quote.name,
  //     quote.exch_desc,
  //     quote.last,
  //     quote.chg,
  //     quote.opn,
  //     quote.vwap,
  //     quote.adv_21,
  //     quote.adp_200,
  //     quote.eps,
  //     quote.pe,
  //     quote.unixTime
  //   );
  // }
}
