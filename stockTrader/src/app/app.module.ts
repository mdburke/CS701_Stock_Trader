import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { SearchComponent } from './search/search.component';
import { Form, FormsModule } from '@angular/forms';
import { TradeKingService } from "./services/trade-king.service";
import { TradeKingMessageService } from "./services/trade-king-message.service";
import { AlphaVantageService } from "./services/alpha-vantage.service";
import { HttpClientJsonpModule, HttpClientModule } from "@angular/common/http";
import { AlphaVantageMessageService } from "./services/alpha-vantage-message.service";
import { StorageService } from "./services/storage.service";
import { TimeToMarketOpenPipe } from './pipes/time-to-market-open.pipe';
import { DndModule } from "ng2-dnd";

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    WatchlistComponent,
    StockDetailsComponent,
    SearchComponent,
    TimeToMarketOpenPipe
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpClientJsonpModule,
    DndModule.forRoot()
  ],
  providers: [
    TradeKingService,
    TradeKingMessageService,
    AlphaVantageService,
    AlphaVantageMessageService,
    StorageService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
