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
  message: any;
  subscription: Subscription;

  results: Observable<any>;
  searchEvent: EventEmitter<any> = new EventEmitter();

  private searchBox: FormControl = new FormControl();
  private tickerSymbol: string;
  private stockData: any;

  constructor(private tradeKingService: TradeKingService, private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(message => { this.message = message });
    this.tickerSymbol = "aapl";
    // this.searchBox
    //   .valueChanges
    //   .subscribe(event => this.searchEvent.emit(event));
  }

  ngOnInit() {
    this.update();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  update() {
    this.tradeKingService.updateTickerSymbol(this.tickerSymbol);
    // this.tradeKingService.getStockData();
    // this.tradeKingService.updateTickerSymbol(this.tickerSymbol);
    // this.stockData = this.tradeKingService.getStockData()
    //   .subscribe(data => {
    //     this.stockData = data;
    //     console.log(this.stockData);
    //   });
  }

}
