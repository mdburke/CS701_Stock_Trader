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
  pe: number;
  unixTime: number;
  change_at: number;
  callTime: number;
  marketStatus: string;
  message: string;

  constructor(symbol: string, companyName: string, exchange: string, last: number, dayChange: number,
              open: number, vwap: number, volume: number, adp_200: number, eps: number, pe: number, unixTime?: number,
              change_at?: number, callTime?: number, marketStatus?: string, message?: string) {
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
    this.pe = pe;
    this.unixTime = unixTime;
    this.change_at = change_at;
    this.callTime = callTime;
    this.marketStatus = marketStatus;
    this.message = message;
  }
}




