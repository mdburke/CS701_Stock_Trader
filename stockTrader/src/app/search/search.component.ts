import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TradeKingService } from "../services/trade-king.service";
import { Subscription } from 'rxjs/Subscription';
import { TradeKingMessageService } from "../services/tradeKingMessage.service";
import { TickerData } from "../models/TickerData";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private stockData: TickerData;
  private tickerSymbol: string;
  private subscription: Subscription;

  constructor(private tradeKingService: TradeKingService, private messageService: TradeKingMessageService) {
    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.stockData = message;
      this.tickerSymbol = this.stockData.symbol;
      // this.tickerSymbol = this.stockData.
    });
    this.tickerSymbol = this.tradeKingService.getTickerSymbol();
  }

  ngOnInit() {
    this.update();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  update() {
    this.tradeKingService.updateTickerSymbol(this.tickerSymbol);
  }

}
