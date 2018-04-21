import { Component, OnDestroy, OnInit } from '@angular/core';
import { TradeKingService } from "../services/trade-king.service";
import { StorageService } from "../services/storage.service";
import { environment } from "../../environments/environment";
import * as cloneDeep from 'lodash/cloneDeep';
import { TradeKingMessageService } from "../services/tradeKingMessage.service";
import { Subscription } from "rxjs/Subscription";
import { MessageData } from "../models/MessageData";

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit, OnDestroy {
  stocks: any[];
  addTicker: string;
  stockData: MessageData;
  subscription: Subscription;

  constructor(private tradeKingService: TradeKingService,
              private storageService: StorageService,
              private messageService: TradeKingMessageService) {
    // Load the watchlist if available in local storage. If not, load defaults
    this.addTicker = '';
    let list = storageService.load('watchlist');
    if (list) {
      this.stocks = list;
    } else {
      this.stocks = cloneDeep(environment.default_watchlist);
    }

    // Make sure to add any symbols in our watchlist to the trade king service
    this.tradeKingService.addSymbols(this.stocks);

    // Subscribe to responses from the trade king service
    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.stockData = message;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  update(symbol: string) {
    this.tradeKingService.updateTickerSymbol(symbol);
  }

  // Add the new symbol to our in-memory store, local storage, and the trade king service
  addNew() {
    this.stocks.push(this.addTicker);
    this.storageService.store('watchlist', this.stocks);
    this.tradeKingService.addSymbols([this.addTicker]);
    this.addTicker = "";
  }

  reset() {
    this.stocks = cloneDeep(environment.default_watchlist);
    this.storageService.store('watchlist', this.stocks);
  }

}
