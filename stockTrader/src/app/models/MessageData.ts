import { ClockData } from "./ClockData";
import { TickerData } from "./TickerData";

export class MessageData {
  clockData: ClockData;
  tickerData: TickerData[];
  mainTicker: string;

  constructor(clockData?: ClockData, tickerData?: TickerData[], mainTicker?: string) {
    this.clockData = clockData || new ClockData();
    this.tickerData = tickerData || [];
    this.mainTicker = mainTicker || '';
  }

  add(tickerData: TickerData) {
    let index = this.tickerData.findIndex(ticker => {
      return ticker.symbol.toLowerCase() === tickerData.symbol.toLowerCase();
    });

    if (index === -1) {
      this.tickerData.push(tickerData);
    } else {
      this.tickerData[index] = tickerData;
    }
  }

  find(symbol: string): TickerData {
    return this.tickerData.find(ticker => {
      return ticker.symbol.toLowerCase() === symbol.toLowerCase();
    })
  }
}




