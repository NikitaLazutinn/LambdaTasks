import currenciesRepository from "../database/repositories/currenciesRepository";
import { ApiError } from "../exeptions/ApiError";
import { CurrencyModel } from "../models/CurrencyModel";

class CurrenciesService {
  async getAllCurrencies(): Promise<CurrencyModel[]> {
    const currencies = await currenciesRepository.getAllAsync();
    return currencies;
  }
  async addCurrency(currency: CurrencyModel) {
    await currenciesRepository.addNewAsync(currency);
  }
  async deleteCurrency(id: string) {
    const existingCurrency = await currenciesRepository.getByIdAsync(id);
    if (!existingCurrency) {
      throw ApiError.NotFound();
    }
    await currenciesRepository.deleteByIdAsync(id);
  }
  async updateCurrency(newCurrency: CurrencyModel) {
    const existingCurrency = await currenciesRepository.getByIdAsync(
      newCurrency.Id
    );
    if (!existingCurrency) {
      throw ApiError.NotFound();
    }
    await currenciesRepository.updateAsync(newCurrency, newCurrency.Id);
  }
}

const currenciesService = new CurrenciesService();
export default currenciesService;