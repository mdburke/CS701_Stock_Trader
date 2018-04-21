import { Component, OnInit } from '@angular/core';
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
export class StockDetailsComponent implements OnInit {
  private stockData: TickerData;
  private clockData: ClockData;
  private subscription: Subscription;

  constructor(private messageService: TradeKingMessageService,
              private tradeKingService: TradeKingService) {
    this.subscription = this.messageService.getMessage().subscribe((message: MessageData) => {
      console.log(message.mainTicker);
      this.stockData = message.find(message.mainTicker);
      console.log(this.stockData);
      this.clockData = message.clockData;
    });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
