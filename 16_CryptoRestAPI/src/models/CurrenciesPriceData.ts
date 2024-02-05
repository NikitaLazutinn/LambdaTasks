export class CurrenciesPriceData {
    [key: string]: number | Date | string;
    DateTime: Date;
    UnixTime: number;
    MarketName: string;
    constructor(date: Date, unixTime: number, marketName: string) {
      this.DateTime = date;
      this.UnixTime = unixTime;
      this.MarketName = marketName;
    }
  }