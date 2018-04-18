import { Component, OnInit } from '@angular/core';
import { TradeKingService } from "../services/trade-king.service";
import { StorageService } from "../services/storage.service";

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  stocks: any[];
  addTicker: string;
  default: any[];

  constructor(private tradeKingService: TradeKingService,
              private storageService: StorageService) {
    this.default = [{symbol: "aapl"}, {symbol: "nvda"}, {symbol:"ibm"}];
    let list = storageService.load('watchlist');
    if (list) {
      this.stocks = list;
    } else {
      this.stocks = this.default;
    }
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
    this.stocks = this.default;
    this.storageService.store('watchlist', this.stocks);
  }

}
