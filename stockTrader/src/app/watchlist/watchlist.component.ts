import { Component, OnInit } from '@angular/core';
import { TradeKingService } from "../services/trade-king.service";

@Component({
  selector: 'app-watchlist',
  templateUrl: './watchlist.component.html',
  styleUrls: ['./watchlist.component.css']
})
export class WatchlistComponent implements OnInit {
  stocks: any[];

  constructor(private tradeKingService: TradeKingService) {
    // localStorage.setItem("StockTraderWatchlist", JSON.stringify(this.books));
    if(localStorage.getItem("StockTraderWatchlist")) {

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

}
