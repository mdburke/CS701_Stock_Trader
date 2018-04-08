import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {TradeKingService} from "../services/trade-king.service";
import {Observable} from "rxjs/Observable";
import {Subscription} from 'rxjs/Subscription';
import {FormControl} from "@angular/forms";
import { MessageService } from "../services/message.service";

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {
  private stockData: any;
  private tickerSymbol: string;
  private subscription: Subscription;

  constructor(private tradeKingService: TradeKingService, private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(message => { this.stockData = message });
    this.tickerSymbol = "aapl";
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
