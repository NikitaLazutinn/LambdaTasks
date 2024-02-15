import priceDataService from "../services/priceDataService";
import {createCodesStering} from "../services/createCurrenciesString";
import currenciesRepository from "../database/repositories/currenciesRepository";

class PriceDataController {
  async getExchangeRates():Promise<string>{
    const cur = await currenciesRepository.getAllAsync();
    const currencies = createCodesStering(cur).split(',');
    let result = "";
    for(let i = 0; i < currencies.length; i++){
    const response = await priceDataService.avgPriceForCurrency(currencies[i]);
    result +=`${response}\n`;
    }

      return result;
  }

  async Info(currency :string):Promise<string>{
    const result = await priceDataService.InfoCurrency(currency);

    return result;
  }

  async Fav(currency :string){
    await priceDataService.AddFavourite(currency);

  }
  async DelFav(currency :string){
    await priceDataService.DeleteFavourite(currency);

  }
  async Get():Promise<string>{
    const res = await priceDataService.GetFav();
    return res;

  }

}

const priceDataController = new PriceDataController();
export default priceDataController;