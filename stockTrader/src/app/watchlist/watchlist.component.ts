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

  constructor(private tradeKingService: TradeKingService,
              private storageService: StorageService) {
    let list = storageService.load('watchlist');
    if (list) {
      this.stocks = list;
    } else {
      this.stocks = [
        {symbol: "aapl"}, {symbol: "nvda"}, {symbol:"ibm"}
      ]
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
    }
  }

}
