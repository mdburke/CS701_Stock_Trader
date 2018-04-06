import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { AppComponent } from './app.component';
import { ChartComponent } from './chart/chart.component';
import { WatchlistComponent } from './watchlist/watchlist.component';
import { StockDetailsComponent } from './stock-details/stock-details.component';
import { SearchComponent } from './search/search.component';


@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    WatchlistComponent,
    StockDetailsComponent,
    SearchComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
