import { CurrencyModel } from "../models/CurrencyModel";

export function createCodesStering(codes: CurrencyModel[]) {
  return JSON.stringify(codes.map((value) => value.CurrencyCode)).replace(
    /"|]|[[]/g,
    ""
  );
}