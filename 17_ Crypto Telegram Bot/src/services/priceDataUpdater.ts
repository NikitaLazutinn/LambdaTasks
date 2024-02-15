import currenciesRepository from "../database/repositories/currenciesRepository";
import priceDataRepository from "../database/repositories/priceDataRepository";
import coinpapricaService from "./exhangesServices/coinpapricaService";
import kucoinService from "./exhangesServices/kucoinService";
import coinStatsService from "./exhangesServices/coinStatsService";
import coinMarketCapService from "./exhangesServices/coinMarketCapService";
import { CurrenciesPriceData } from "../models/CurrenciesPriceData";
import coinbaseService from "./exhangesServices/coinbaseService";

export async function updatePricesAsync() {
  const currencies = await currenciesRepository.getAllAsync();
  const unixTime = Date.now();
  const date = new Date();
  const pricesData: CurrenciesPriceData[] = [];
  pricesData.push(
    await coinbaseService.getPriceInfoAsync(date, unixTime, currencies)
  );
  pricesData.push(
    await coinMarketCapService.getPriceInfoAsync(date, unixTime, currencies)
  );
  // pricesData.push(
  //   await coinpapricaService.getPriceInfoAsync(date, unixTime, currencies)
  // );

  pricesData.push(
    await kucoinService.getPriceInfoAsync(date, unixTime, currencies)
  );
  pricesData.push(
    await coinStatsService.getPriceInfoAsync(date, unixTime, currencies)
  );
  await priceDataRepository.addManyAsync(pricesData);

} 