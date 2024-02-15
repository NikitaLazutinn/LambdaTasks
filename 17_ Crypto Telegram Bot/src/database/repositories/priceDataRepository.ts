import { BaseRepository } from "./baseRepository";
import database from "../databaseConnection";
import Database from "../db";
import { CurrenciesPriceData } from "../../models/CurrenciesPriceData";

class PriceDataRepository extends BaseRepository<CurrenciesPriceData> {

  async getCurrencyPrice(currencyCode: string):Promise<string> {
    const price = Database.db.select(currencyCode).from(this.tableName);
    const data = await price;
    const sum = data.reduce((accumulator, currentValue) => {
      return accumulator + currentValue[currencyCode];
    }, 0); 
    const average = sum / data.length;
    const result = `${currencyCode}: ${average.toString()}`

    return result; 

  }
  async getCurrencyInfo(currencyCode: string):Promise<string> {
    const res_id = Database.db.select('Id').from('currencies').where('CurrencyCode', '=', currencyCode);
    const id = await res_id;
    const res_name = Database.db.select('CurrencyName').from('currencies').where('CurrencyCode', '=', currencyCode);
    const name = await res_name;
    const price = Database.db.select(currencyCode).from(this.tableName);
    const data = await price;
    const sum = data.reduce((accumulator, currentValue) => {
      return accumulator + currentValue[currencyCode];
    }, 0); 
    const average = sum / data.length;

    return `Id: ${id[0].Id}\nCurrencyCode: ${currencyCode}\nCurrencyName: ${name[0].CurrencyName}\nPrice: ${average} $\n\n`; 

  }
  async addFav(currencyCode: string){
    try{
    const a = Database.db('currencies').where('CurrencyCode', '=', currencyCode).update({ FAV: true });
    const b = await a;
    }catch(err){
      console.log(err);
    }
    
  }

  async DeleteFav(currencyCode: string){
    try{
    const a = Database.db('currencies').where('CurrencyCode', '=', currencyCode).update({ FAV: false });
    const b = await a;
    }catch(err){
      console.log(err);
    }
    
  }

  async getFav():Promise<string>{
    const res = Database.db.select('CurrencyCode').from('currencies').where('FAV', true);
    const CurrencyCodes = await res;
    let result = "";
    for(let i = 0; i < CurrencyCodes.length; i++){
      const a = await this.getCurrencyInfo(CurrencyCodes[i].CurrencyCode);
      result += a;
    }
    console.log(result);

    return result.toString(); 

  }

  async deleteLegacyData() {
    const date = Date.now();
    const dayInUnixFormat = 24 * 60 * 60 * 1000;
    await Database.db(this.tableName)
    .whereRaw(`(${date} - UnixTime) > ${dayInUnixFormat}`)
    .del();
  }

}
const priceDataRepository = new PriceDataRepository(
  "allcurrenciesdata",
  database
);
export default priceDataRepository;