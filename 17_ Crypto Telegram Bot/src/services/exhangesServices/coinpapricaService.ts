import coinpapricaRequests from "../requests/requestDataFromCoinparica";
import { CurrencyModel } from "../../models/CurrencyModel";
import { CurrenciesPriceData } from "../../models/CurrenciesPriceData";

class CoinpapricaService {
  async getPriceInfoAsync(
    date: Date,
    unixTime: number,
    currencies: CurrencyModel[]
  ): Promise<CurrenciesPriceData> {
    const coinpaprikaData = await coinpapricaRequests.requestDataAsync();
    const result = new CurrenciesPriceData(date, unixTime, "Coinpaprica");
    for (let i = 0; i < currencies.length; i++) {
      let currencyData;
      try{
        currencyData = coinpaprikaData.find(
        (value: { id: string }) => value.id == currencies[i].CoinPapricaId
      );
      }catch{
     console.log('missed');    
    }
      if (!currencyData) {
        const price = 0;
        const key = currencies[i].CurrencyCode as keyof CurrenciesPriceData;
        result[key] = price;
        i++;
      }else{
      const price = currencyData.quotes.USD.price;
      const key = currencies[i].CurrencyCode as keyof CurrenciesPriceData;
      result[key] = price;
      }
    }

    return result;
  }
}
const coinpapricaService = new CoinpapricaService();
export default coinpapricaService;