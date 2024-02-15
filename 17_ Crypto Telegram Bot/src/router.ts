import Router from "express";
import priceDataController from "./controllers/PriceDataController";
import currenciesController from "./controllers/CurrenciesController";

const defaultRouter = Router();

defaultRouter.get("/price", priceDataController.getExchangeRates);
defaultRouter.get(
  "/currencies",
  currenciesController.getAllAveliableCurrencies
);
defaultRouter.post("/currencies", currenciesController.addNew);
defaultRouter.delete("/currencies", currenciesController.deleteCurrency);
defaultRouter.put("/currencies", currenciesController.updateCurrency);

export default defaultRouter;