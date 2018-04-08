import { Component, OnInit } from '@angular/core';
import * as Plotly from 'plotly.js';
import { AlphaVantageService } from "../services/alpha-vantage.service";
import { TradeKingService } from "../services/trade-king.service";
import { Subscription } from "rxjs/Subscription";
import { TradeKingMessageService } from "../services/tradeKingMessage.service";
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

  constructor(private alphaVantageService: AlphaVantageService,
              private tradeKingService: TradeKingService,
              private tradeKingMessageService: TradeKingMessageService,
              private alphaVantageMessageService: AlphaVantageMessageService) {
    this.symbol = tradeKingService.getTickerSymbol();
    this.tradeKingSubscription = this.tradeKingMessageService.getMessage().subscribe(message => {
      this.symbol = message.symbol;
      this.alphaVantageService.updateTicker(this.symbol);
    });
    this.alphaVantageSubscription = this.alphaVantageMessageService.getMessage().subscribe(message => {
      this.data = message;
      this.updateChart();
    });
  }

  ngOnInit() {
  }

  updateChart() {
    let div = document.getElementById('chart');

    if (this.data) {
      console.log(this.data);
      let chartData = [{
        x: this.data.dates,
        close: this.data.closes,
        decreasing: {line: {color: '#7F7F7F'}},
        high: this.data.highs,
        increasing: {line: {color: '#17BECF'}},
        line: {color: 'rgba(31,119,180,1)'},
        low: this.data.lows,
        open: this.data.opens,
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
          range: ['2017-11-10', '2018-04-06'],
          rangeslider: { range: ['2017-11-10', '2018-04-06']},
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

      Plotly.newPlot(div, chartData, layout);
    } else {
      div.innerText = "Loading...";
    }

  }

}
