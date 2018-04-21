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
  private tickerSymbols: string[];
  private messageData: MessageData;

  constructor(private messageService: TradeKingMessageService, private storageService: StorageService) {
    // Load data from local storage or use defaults
    this.mainTicker = storageService.load('mainTicker') || 'aapl';
    this.tickerSymbols = storageService.load('tickers') || ['aapl', 'nvda', 'ibm'];
    this.messageData = new MessageData();

    // Set up the oauth client to make the calls to Trade King
    // This also handles refresh and headers automatically behind the scenes for us.
    this.api_consumer = new oauth.OAuth(
      environment.urls.trade_king_request,
      environment.urls.trade_king_access,
      secrets.auth.consumer_key,
      secrets.auth.consumer_secret,
      "1.0",
      "http://mywebsite.com/tradeking/callback",
      "HMAC-SHA1"
    );

    // Set up the timed job to update the stock data
    TimerObservable.create(0, 5000)
      .subscribe(() => {
        this.getStockData();
      });
  }

  getTickerSymbol(): string {
    return this.mainTicker;
  }

  // Updates the 'main' symbol, refreshes the data and updates local storage
  updateTickerSymbol(tickerSymbol: string): void {
    this.mainTicker = tickerSymbol;
    this.messageData.mainTicker = this.mainTicker;
    this.getStockData();
    this.storageService.store("mainTicker", this.mainTicker);
  }

  // Add symbols to the list of tickers for the trade king call
  addSymbols(symbols: string[]) {
    symbols.forEach(symbol => {
      if (this.tickerSymbols.indexOf(symbol) === -1) {
        this.tickerSymbols.push(symbol);
      }
    });
  }

  // Makes the two async calls to trade king to get both the clock data and the quote data
  // Then sends the message with the latest info to all consumers.
  async getStockData() {
    await this.getMarketStatus();
    await this.getQuotes();
    this.sendMessage(this.messageData);
  }

  // Calls the Trade King clock api and sets up the message data with the correct information
  getMarketStatus(): Promise<string> {
    return new Promise((resolve, reject) => {
      this.api_consumer.get(
        secrets.auth.api_url + '/market/clock.json',
        secrets.auth.access_token,
        secrets.auth.access_secret,
        (error, data, response) => {
          if (error !== null) return reject(error);

          // Set the data in the messageData object with the latest market status information
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

  // Calls the Trade King quotes api and sets up the message data with the correct information
  getQuotes() {
    return new Promise((resolve, reject) => {
      this.api_consumer.get(
        // Build the request url with all the relevant tickers that we care about
        secrets.auth.api_url + '/market/ext/quotes.json?symbols=' + this.tickerSymbols.join(',') + ',' + this.mainTicker,
        secrets.auth.access_token,
        secrets.auth.access_secret,
        (error, data, response) => {
          if (error !== null) return reject(error);
          let quotes = JSON.parse(data).response.quotes.quote;

          // Push the new updated data onto our messageData tickerdata array
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

  sendMessage(message: any): void {
    this.messageService.sendMessage(message);
  }

  clearMessage(): void {
    this.messageService.clearMessage();
  }
}
