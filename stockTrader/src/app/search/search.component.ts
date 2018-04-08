import { Component, OnInit } from '@angular/core';
import {TradeKingService} from "../services/trade-king.service";
import {Observable} from "rxjs/Observable";
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  private tickerSymbol: string;
  private stockData: any;

  constructor(private tradeKingService: TradeKingService) {
    this.tickerSymbol = "";
  }

  ngOnInit() {
    this.updateStockData();
  }

  updateStockData(): void {
    this.tradeKingService.getStockData()
      .subscribe(data => {
        this.stockData = data;
        console.log(this.stockData);
      });
  }

  update() {
    this.tradeKingService.updateTickerSymbol(this.tickerSymbol);
    this.stockData = this.tradeKingService.getStockData()
      .subscribe(data => {
        this.stockData = data;
        console.log(this.stockData);
      });
  }

}
