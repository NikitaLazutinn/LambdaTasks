import { NextFunction, Request, Response } from "express";
import currenciesService from "../services/currenciesService";

class CurrenciesController {
  async getAllAveliableCurrencies() {
      const result = await currenciesService.getAllCurrencies();
      return result;
     
  }
  async addNew(req: Request, res: Response, next: NextFunction) {
    try {
      await currenciesService.addCurrency(req.body);
      res
        .status(200)
        .json({ Message: "Successfully added", Currency: req.body });
    } catch (err) {
      next(err);
    }
  }
  async deleteCurrency(req: Request, res: Response, next: NextFunction) {
    try {
      await currenciesService.deleteCurrency(req.body.Id);
      res
        .status(200)
        .json({ Message: "Successfully deleted", Currency: req.body });
    } catch (err) {
      next(err);
    }
  }
  async updateCurrency(req: Request, res: Response, next: NextFunction) {
    try {
      await currenciesService.updateCurrency(req.body);
      res
        .status(200)
        .json({ Message: "Successfully updated", Currency: req.body });
    } catch (err) {
      next(err);
    }
  }
}

const currenciesController = new CurrenciesController();
export default currenciesController;