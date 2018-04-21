import { ClockData } from "./ClockData";
import { TickerData } from "./TickerData";

// Class that holds the ClockData, an array of TickerData and 'mainTicker' info that gets returned by the
// Trade King API service to the various elements in the app.
export class MessageData {
  clockData: ClockData;
  tickerData: TickerData[];
  mainTicker: string;

  constructor(clockData?: ClockData, tickerData?: TickerData[], mainTicker?: string) {
    this.clockData = clockData || new ClockData();
    this.tickerData = tickerData || [];
    this.mainTicker = mainTicker || '';
  }

  // Add TickerData to the array of tickerData
  add(tickerData: TickerData) {
    // Try to find the index to see if this data already exists (so we don't keep adding the same symbol)
    let index = this.tickerData.findIndex(ticker => {
      return ticker.symbol.toLowerCase() === tickerData.symbol.toLowerCase();
    });

    // If it does not exist, push it onto the array. If it does, just update the data
    if (index === -1) {
      this.tickerData.push(tickerData);
    } else {
      this.tickerData[index] = tickerData;
    }
  }

  // Finds the correct TickerData in the array given the symbol as the id.
  find(symbol: string): TickerData {
    return this.tickerData.find(ticker => {
      return ticker.symbol.toLowerCase() === symbol.toLowerCase();
    })
  }
}




