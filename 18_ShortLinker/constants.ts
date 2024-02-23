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
  constructor() {
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