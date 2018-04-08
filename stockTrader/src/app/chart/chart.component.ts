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
      Plotly.purge(document.getElementById("plotly"));
      this.alphaVantageService.updateTicker(this.symbol);
    });
    this.alphaVantageSubscription = this.alphaVantageMessageService.getMessage().subscribe(message => {
      this.data = message;
      this.updateChart();
    });
  }

  ngOnInit() {
    Plotly.purge(document.getElementById("plotly"));
  }

  updateChart() {
    let div = document.getElementById('plotly');

    if (this.data) {
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
        // plot_bgcolor: '#ecf0f1',
        // paper_bgcolor: '#ecf0f1',
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

      Plotly.newPlot(div, chartData, layout);
    } else {
      div.innerText = "Loading...";
    }

  }

}
