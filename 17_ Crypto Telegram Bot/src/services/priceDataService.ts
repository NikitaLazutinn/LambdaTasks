import {createCodesStering} from "../services/createCurrenciesString";
import currenciesRepository from "../database/repositories/currenciesRepository";
import PriceDataRepository from "../database/repositories/priceDataRepository"

class PriceDataService {
  async getExchangeRates():Promise<string>{
    const cur = await currenciesRepository.getAllAsync();
    const currencies = createCodesStering(cur).split(',');
    let result = "";
    for(let i = 0; i < currencies.length; i++){
    const response = await PriceDataRepository.getCurrencyPrice(currencies[i]);
    result +=`${response}\n`;
    }

      return result;
  }

  async Info(currency :string):Promise<string>{
    const result = await PriceDataRepository.getCurrencyInfo(currency);

    return result;
  }

  async Fav(currency :string){
    await PriceDataRepository.addFav(currency);

  }
  async DelFav(currency :string){
    await PriceDataRepository.DeleteFav(currency);

  }
  async Get():Promise<string>{
    const res = await PriceDataRepository.getFav();
    return res;

  }
}

const priceDataService = new PriceDataService();
export default priceDataService;