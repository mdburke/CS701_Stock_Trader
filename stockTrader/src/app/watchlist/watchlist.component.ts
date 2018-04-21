import { Component, OnInit } from '@angular/core';
import { TradeKingService } from "../services/trade-king.service";
import { StorageService } from "../services/storage.service";
import { environment } from "../../environments/environment";
import * as cloneDeep from 'lodash/cloneDeep';
import { TradeKingMessageService } from "../services/tradeKingMessage.service";
import { Subscription } from "rxjs/Subscription";
import { TickerData } from "../models/TickerData";

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  stocks: any[];
  addTicker: string;
  private stockData: TickerData[];
  private subscription: Subscription;

  constructor(private tradeKingService: TradeKingService,
              private storageService: StorageService,
              private messageService: TradeKingMessageService) {
    this.addTicker = '';
    let list = storageService.load('watchlist');
    if (list) {
      this.stocks = list;
    } else {
      this.stocks = cloneDeep(environment.default_watchlist);
    }
    this.tradeKingService.addSymbols(this.stocks);
    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.stockData = message.tickerData;
    });
  }

  sortStockData(stockData: TickerData[]): TickerData[] {
    return stockData;
  }

  ngOnInit() {
  }

  update(symbol: string) {
    this.tradeKingService.updateTickerSymbol(symbol);
  }

  addNew() {
    if (this.addTicker.length > 0) {
      this.stocks.push({symbol: this.addTicker});
      this.storageService.store('watchlist', this.stocks);
      this.addTicker = "";
    }
  }

  reset() {
    this.stocks = cloneDeep(environment.default_watchlist);
    this.storageService.store('watchlist', this.stocks);
  }

}
