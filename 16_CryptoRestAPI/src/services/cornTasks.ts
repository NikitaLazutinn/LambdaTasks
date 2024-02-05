import { CronJob } from "cron";
import priceDataRepository from "../database/repositories/priceDataRepository";
import { updatePricesAsync } from "./priceDataUpdater";

export const updatePrices = new CronJob("*/5 * * * *", async function () {
  await updatePricesAsync();
  console.log("updatePrices");
});

export const deleteLegacyData = new CronJob("0 */4 * * *", async function () {
  await priceDataRepository.deleteLegacyData();
  console.log("deleteLegacyData");
});