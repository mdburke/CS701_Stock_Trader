import { Component, OnInit } from '@angular/core';
import {Subscription} from "rxjs/Subscription";
import {MessageService} from "../services/message.service";
import {TickerData} from "../models/TickerData";

@Component({
  selector: 'app-stock-details',
  templateUrl: './stock-details.component.html',
  styleUrls: ['./stock-details.component.css']
})
export class StockDetailsComponent implements OnInit {
  private stockData: TickerData;
  private subscription: Subscription;

  constructor(private messageService: MessageService) {
    this.subscription = this.messageService.getMessage().subscribe(message => { this.stockData = message });
  }

  ngOnInit() {}

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
