import coinbaseRequests from "../requests/requestDataFromCoinbase";
import { CurrencyModel } from "../../models/CurrencyModel";
import { CurrenciesPriceData } from "../../models/CurrenciesPriceData";

class CoinbaseService {
  async getPriceInfoAsync(
    date: Date,
    unixTime: number,
    currencies: CurrencyModel[]
  ): Promise<CurrenciesPriceData> {
    const usdExchange = await coinbaseRequests.requestDataAsync("USD");
    const result = new CurrenciesPriceData(date, unixTime, "Coinbase");

    for (let i = 0; i < currencies.length; i++) {
      let price = 1 / +usdExchange.data.rates[currencies[i].CurrencyCode];
      if (Number.isNaN(price)) {
        const currencyData = await coinbaseRequests.requestDataAsync(
          currencies[i].CurrencyCode
        );
        price = currencyData.data.rates.USD;
        if(!price){
          price = 0;
        }
        
      }
      const key = currencies[i].CurrencyCode as keyof CurrenciesPriceData;
      result[key] = +price;
    }

   return result;
   
   
  }
}

const coinbaseService = new CoinbaseService();
export default coinbaseService;