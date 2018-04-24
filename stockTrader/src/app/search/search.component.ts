import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TradeKingService } from "../services/trade-king.service";
import { Subscription } from 'rxjs/Subscription';
import { TradeKingMessageService } from "../services/trade-king-message.service";
import { TickerData } from "../models/TickerData";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private tickerSymbol: string;
  private subscription: Subscription;

  constructor(private tradeKingService: TradeKingService, private messageService: TradeKingMessageService) {
    // Subscribe to the Trade King Service messages to update the data.
    this.subscription = this.messageService.getMessage().subscribe(message => {
      this.tickerSymbol = message.mainTicker;
    });

    // Set the initial ticker symbol
    this.tickerSymbol = this.tradeKingService.getTickerSymbol();
  }

  ngOnInit() {
    this.update();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  // Update the ticker symbol in the Trade King Service when the user clicks Submit
  update() {
    this.tradeKingService.updateTickerSymbol(this.tickerSymbol);
  }

}
