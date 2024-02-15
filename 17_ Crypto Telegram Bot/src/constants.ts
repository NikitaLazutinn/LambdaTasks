import * as dotenv from "dotenv";
dotenv.config();

class Constants {
  PORT: string | undefined;
  NODE_ENV: string | undefined;
  HOST: string | undefined;
  HOST_URL: string | undefined;
  SQL_SERVER: string | undefined;
  SQL_DATABASE: string | undefined;
  SQL_PASSWORD: string | undefined;
  SQL_USER: string | undefined;
  COIN_MARKET_CAP_API_KEY: string | undefined;
  COINSTATS_URL:string|undefined;
  KUCOIN_URL:string|undefined;
  COINPAPRICA_URL:string|undefined;
  COIN_MARKET_CAP_URL:string|undefined;
  COINBASE_URL:string|undefined;
  COINSTATS_API_KEY:string|undefined;
  Token:string;
  constructor() {
    if (!process.env.TG_Token) {
      throw new Error('TG_Token is not defined in the environment variables.');
  }else{
  this.Token = process.env.TG_Token;
  }
    this.COINSTATS_API_KEY = process.env.COINSTATS_API_KEY;
    this.COINBASE_URL = process.env.COINBASE_URL;
    this.COIN_MARKET_CAP_URL = process.env.COIN_MARKET_CAP_URL;
    this.COINPAPRICA_URL = process.env.COINPAPRICA_URL;
    this.KUCOIN_URL=process.env.KUCOIN_URL;
    this.COINSTATS_URL = process.env.COINSTATS_URL;
    this.COIN_MARKET_CAP_API_KEY = process.env.COIN_MARKET_CAP_API_KEY;
    this.PORT = process.env.PORT;
    this.HOST = process.env.HOST;
    this.NODE_ENV = process.env.NODE_ENV;
    this.HOST_URL = process.env.HOST_URL;
    this.SQL_SERVER = process.env.SQL_SERVER;
    this.SQL_DATABASE = process.env.SQL_DATABASE;
    this.SQL_PASSWORD = process.env.SQL_PASSWORD;
    this.SQL_USER = process.env.SQL_USER;
  }
}

const constants = new Constants();
export default constants;