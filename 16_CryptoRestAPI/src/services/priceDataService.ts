import { PriceDataResponceModel } from "../models/PriceDataResponceModel";
import { RequestPriceData } from "../models/RequestPriceDataModel";
import priceDataRepository from "../database/repositories/priceDataRepository";

class PriceDataService {
  async avgPriceForCurrency(query: RequestPriceData) {
    const unixTime = +query.Hours * 60 * 60 * 1000;
    if (query.Exchange) {
      const price = await priceDataRepository.getCurrencyPriceByMarket(
        query.Currency,
        unixTime,
        query.Exchange
      );
      const reponce: PriceDataResponceModel = {
        Price: JSON.parse(JSON.stringify(price).replace(/\[|]/g, ""))[
          `AVG(${query.Currency})`
        ],
        Exchange: query.Exchange,
        Currency: query.Currency,
        Time: query.Hours + " hours",
        UnixTime: unixTime,
      };
      return reponce;
    }
    const price = await priceDataRepository.getCurrencyPrice(
      query.Currency,
      unixTime
    );
    const responce: PriceDataResponceModel = {
      Price: JSON.parse(JSON.stringify(price).replace(/\[|]/g, ""))[
        `AVG(${query.Currency})`
      ],
      Exchange: "Average data from  all markets", 
      Currency: query.Currency,
      Time: query.Hours + " hours",
      UnixTime: unixTime,
    };
    return responce;
  }
}

const priceDataService = new PriceDataService();
export default priceDataService;