import { BaseRepository } from "./baseRepository";
import database from "../databaseConnection";
import { CurrenciesPriceData } from "../../models/CurrenciesPriceData";

class PriceDataRepository extends BaseRepository<CurrenciesPriceData> {
  async deleteLegacyData() {
    const date = Date.now();
    const dayInUnixFormat = 24 * 60 * 60 * 1000;
    await this.db.executeQueryAsync(
      `DELETE FROM ${this.tableName} WHERE (${date} - UnixTime) > ${dayInUnixFormat}`
    );
  }
  async getCurrencyPrice(currencyCode: string, time: number) {
    const currentDate = Date.now();
    const [price] = await this.db.executeQueryAsync(
      `SELECT AVG(${currencyCode}) FROM ${this.tableName} WHERE (${currentDate} - UnixTime) < ${time}`
    );
    return price;
  }
  async getCurrencyPriceByMarket(
    currencyCode: string,
    time: number,
    marketName: string
  ) {

    const currentDate = Date.now();
    const [price] = await this.db.executeQueryAsync(
      `SELECT AVG(${currencyCode}) FROM ${this.tableName} 
        WHERE (${currentDate} - UnixTime) < ${time}  
        AND MarketName = '${marketName}'`
    );
    return price;
  }
}
const priceDataRepository = new PriceDataRepository(
  "allcurrenciesdata",
  database
);
export default priceDataRepository;