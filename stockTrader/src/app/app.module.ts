import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { SearchComponent } from './search/search.component';
import { Form, FormsModule } from '@angular/forms';
import { TradeKingService } from "./services/trade-king.service";
import { TradeKingMessageService } from "./services/tradeKingMessage.service";
import { AlphaVantageService } from "./services/alpha-vantage.service";
import { HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";
import { AlphaVantageMessageService } from "./services/alpha-vantage-message.service";

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    WatchlistComponent,
    StockDetailsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule
  ],
  providers: [
    TradeKingService,
    TradeKingMessageService,
    AlphaVantageService,
    AlphaVantageMessageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
