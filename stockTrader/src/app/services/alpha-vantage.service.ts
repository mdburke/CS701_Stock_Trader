import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { environment } from "../../environments/environment";
import { Subscription } from "rxjs/Subscription";
import { AlphaVantageMessageService } from "./alpha-vantage-message.service";

@Injectable()
export class AlphaVantageService {
  symbol: string;

  constructor(private http: HttpClient,
              private alphaVantageMessageService: AlphaVantageMessageService) {
    this.symbol = 'aapl';
  }

  updateStockData(): Subscription {
    let url = environment.urls.alpha_vantage_daily + this.symbol + environment.urls.alpha_vantage_api_key_suffix;
    return this.http
      .get(url)
      .subscribe(data => {
        this.alphaVantageMessageService.sendMessage(AlphaVantageService.transformData(data));
      });
  }

  updateTicker(symbol: string): void {
    this.symbol = symbol;
    this.updateStockData();
  }

  private static transformData(data) {
    let days = data["Time Series (Daily)"];
    let transformedData = {
      dates: [],
      opens: [],
      highs: [],
      lows: [],
      closes: [],
      volumes: []
    };

    for (let day in days) {
      transformedData.dates.push(day);
      transformedData.opens.push(days[day]["1. open"]);
      transformedData.highs.push(days[day]["2. high"]);
      transformedData.lows.push(days[day]["3. low"]);
      transformedData.closes.push(days[day]["4. close"]);
      transformedData.volumes.push(days[day]["5. volume"]);
    }

    return  {
      dates: transformedData.dates.reverse(),
      opens: transformedData.opens.reverse(),
      highs: transformedData.highs.reverse(),
      lows: transformedData.lows.reverse(),
      closes: transformedData.closes.reverse(),
      volumes: transformedData.volumes.reverse()
    };
  }
}
