import { Component, OnInit } from '@angular/core';
import * as oauth from 'oauth';
import {secrets} from "../../environments/secrets";
import {environment} from "../../environments/environment";
import {TradeKingService} from "../trade-king.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  tickerSymbol: string;
  stockData: any;

  constructor(private tradeKingService: TradeKingService) {
    this.tickerSymbol = "";
  }

  ngOnInit() {
    this.getStockData();
  }

  getStockData(): void {
    this.tradeKingService.getStockData()
      .subscribe(data => {
        this.stockData = data
        console.log(this.stockData);
      });
  }

  update() {
    this.stockData = this.tradeKingService.currentData;
    // console.log(this.stockData);
  }

}
