export class TickerData {
  symbol: string;
  companyName: string;
  exchange: string;
  last: number;
  dayChange: number;
  open: number;
  vwap: number;
  volume: number;
  adp_200: number;
  eps: number;
  callTime: number;
  marketStatus: string;

  constructor(symbol: string, companyName: string, exchange: string, last: number, dayChange: number,
              open: number, vwap: number, volume: number, adp_200: number, eps: number, callTime?: number,
              marketStatus?: string) {
    this.symbol = symbol;
    this.companyName = companyName;
    this.exchange = exchange;
    this.last = last;
    this.dayChange = dayChange;
    this.open = open;
    this.vwap = vwap;
    this.volume = volume;
    this.adp_200 = adp_200;
    this.eps = eps;
    this.callTime = callTime;
    this.marketStatus = marketStatus;
  }
}




