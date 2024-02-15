import { CurrencyModel } from "../../models/CurrencyModel";
import { BaseRepository } from "./baseRepository";
import database from "../databaseConnection";

class CurrenciesRepository extends BaseRepository<CurrencyModel> {}

const currenciesRepository = new CurrenciesRepository("currencies", database);
export default currenciesRepository;