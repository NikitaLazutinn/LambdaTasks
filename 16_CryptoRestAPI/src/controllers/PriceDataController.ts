import { NextFunction, Request, Response } from "express";
import priceDataService from "../services/priceDataService";
import { RequestPriceData } from "../models/RequestPriceDataModel";

class PriceDataController {
  async getExchangeRates(req: Request, res: Response, next: NextFunction) {
    try {
      const queryParameters = req.query;     
      const { currency, hours, exchange } = queryParameters;
      const queryParams: RequestPriceData = {
        Currency: currency as string,
        Hours: hours as string,
        Exchange: exchange as string | undefined,
      };
      if (!queryParams.Currency || !queryParams.Hours) {
        return res
          .status(400)
          .json({ status: 400, message: "Incorrect query parameters" });
      }
      const result = await priceDataService.avgPriceForCurrency(queryParams);
      return res.status(200).json(result);
    } catch (err) {
      next(err);
    }
  }
}

const priceDataController = new PriceDataController();
export default priceDataController;