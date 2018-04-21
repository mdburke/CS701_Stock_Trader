import { Component, OnDestroy, OnInit } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {TickerData} from "../models/TickerData";
import { TradeKingMessageService } from "../services/tradeKingMessage.service";
import { TradeKingService } from "../services/trade-king.service";
import { ClockData } from "../models/ClockData";
import { MessageData } from "../models/MessageData";

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit, OnDestroy {
  private stockData: TickerData;
  private clockData: ClockData;
  private subscription: Subscription;

  constructor(private messageService: TradeKingMessageService) {
    // Subscribe to updates from the Trade King API service
    this.subscription = this.messageService.getMessage().subscribe((message: MessageData) => {
      this.stockData = message.find(message.mainTicker);
      this.clockData = message.clockData;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
