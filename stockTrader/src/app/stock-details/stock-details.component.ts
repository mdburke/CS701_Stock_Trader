import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {TickerData} from "../models/TickerData";
import { TradeKingMessageService } from "../services/tradeKingMessage.service";

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  private stockData: TickerData;
  private subscription: Subscription;

  constructor(private messageService: TradeKingMessageService) {
    this.subscription = this.messageService.getMessage().subscribe(message => { this.stockData = message });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
