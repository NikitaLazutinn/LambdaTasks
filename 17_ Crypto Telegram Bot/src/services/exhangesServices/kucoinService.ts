import kucoinRequests from "../requests/requestDataFromKucoin";
import { createCodesStering } from "../createCurrenciesString";
import { CurrencyModel } from "../../models/CurrencyModel";
import { CurrenciesPriceData } from "../../models/CurrenciesPriceData";

class KukoinService {
  async getPriceInfoAsync(
    date: Date,
    unixTime: number,
    currencies: CurrencyModel[]
  ): Promise<CurrenciesPriceData> {
    const codesString = createCodesStering(currencies);
    const kucoinData = await kucoinRequests.requestData(codesString);
     const result = new CurrenciesPriceData(date, unixTime, "Kucoin");
    for (let i = 0; i < currencies.length; i++) {
      let price = kucoinData[currencies[i].CurrencyCode];
      if (currencies[i].Id == "iota") {
        const iotaData = await kucoinRequests.requestData("IOTA");
        price = iotaData["IOTA"];
      }
      const key = currencies[i].CurrencyCode as keyof CurrenciesPriceData;
      result[key] = +price;
    }
    return result;
  }
}
const kucoinService = new KukoinService();
export default kucoinService;