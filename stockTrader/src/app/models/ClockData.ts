export class ClockData {
  unixTime: number;
  change_at: number;
  callTime: number;
  marketStatus: string;
  message: string;

  constructor(unixTime?: number, change_at?: number, callTime?: number, marketStatus?: string, message?: string) {
    this.unixTime = unixTime;
    this.change_at = change_at;
    this.callTime = callTime;
    this.marketStatus = marketStatus;
    this.message = message;
  }
}




