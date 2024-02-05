import coinStatsRequests from "../requests/requestDataFromCoinStats";
import { CurrencyModel } from "../../models/CurrencyModel";
import { CurrenciesPriceData } from "../../models/CurrenciesPriceData";

class CoinStatsService {
  async getPriceInfoAsync(
    date: Date,
    unixTime: number,
    currencies: CurrencyModel[]
  ): Promise<CurrenciesPriceData> {

    const result = new CurrenciesPriceData(date, unixTime, "Coinstats");
    for (let i = 0; i < currencies.length; i++) {
      try{

        const dataByCoinId = await coinStatsRequests.requestDataByIdAsync(
          currencies[i].Id
        );

      const price = dataByCoinId["price"];
      const key = currencies[i].CurrencyCode as keyof CurrenciesPriceData;
      result[key] = price;

    }catch{
      const price = 0;
      const key = currencies[i].CurrencyCode as keyof CurrenciesPriceData;
      result[key] = price;
    }

   
  }
  
  return result;
}
}
const coinStatsService = new CoinStatsService();
export default coinStatsService;