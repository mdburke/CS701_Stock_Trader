import { Component, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js';
import { AlphaVantageService } from "../services/alpha-vantage.service";
import { TradeKingService } from "../services/trade-king.service";
import { Subscription } from "rxjs/Subscription";
import { TradeKingMessageService } from "../services/trade-king-message.service";
import { AlphaVantageMessageService } from "../services/alpha-vantage-message.service";

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {
  private data: any;
  private symbol: string;
  private tradeKingSubscription: Subscription;
  private alphaVantageSubscription: Subscription;
  private runOnce: boolean;

  constructor(private alphaVantageService: AlphaVantageService,
              private tradeKingService: TradeKingService,
              private tradeKingMessageService: TradeKingMessageService,
              private alphaVantageMessageService: AlphaVantageMessageService) {

    // Get initial symbol to use
    this.symbol = tradeKingService.getTickerSymbol();

    // runOnce is a flag to ensure everything is called at least once when you first load the page.
    this.runOnce = false;

    // The subscription for the Trade King Service. The callback updates the data and purges the graph to show the new info.
    this.tradeKingSubscription = this.tradeKingMessageService.getMessage().subscribe(message => {
      if (message.mainTicker !== this.symbol || this.runOnce === false) {
        this.runOnce = true;
        this.symbol = message.mainTicker;
        Plotly.purge(document.getElementById("plotly"));

        // Makes a call to Alpha Vantage (the API that gets the full historical data)
        this.alphaVantageService.updateTicker(this.symbol);
      }
    });

    // Subscribes to the response of Alpha Vantage api to get the latest data when the symbol is updated.
    this.alphaVantageSubscription = this.alphaVantageMessageService.getMessage().subscribe(message => {
      this.data = message;
      this.updateChart();
    });
  }

  ngOnInit() {
    Plotly.purge(document.getElementById("plotly"));
  }

  // Updates the chart with the latest data
  updateChart() {
    let div = document.getElementById('plotly');

    // Don't load the data if it's not there
    if (this.data) {
      // Translate the data we got from Alpha Vantage into the format necessary for Plotly
      let chartData = [{
        x: this.data.dates,
        close: this.data.closes,
        high: this.data.highs,
        low: this.data.lows,
        open: this.data.opens,
        line: {color: 'rgba(31,119,180,1)'},
        decreasing: {line: {color: '#c0392b'}},
        increasing: {line: {color: '#2ecc71'}},
        type: 'candlestick',
        xaxis: 'x',
        yaxis: 'y'
      }];

      let layout = {
        dragmode: 'zoom',
        margin: {
          r: 10,
          t: 25,
          b: 40,
          l: 60
        },
        showlegend: false,
        xaxis: {
          autorange: true,
          domain: [0, 1],
          title: 'Date',
          type: 'date'
        },
        yaxis: {
          autorange: true,
          domain: [0, 1],
          range: [114.609999778, 137.410004222],
          type: 'linear'
        }
      };

      // Actually plots the new data with the given data and layout
      Plotly.newPlot(div, chartData, layout);
    } else {
      div.innerText = "Loading...";
    }
  }
}
