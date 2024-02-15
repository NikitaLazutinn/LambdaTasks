import sql from "mysql2/promise";
import constants from "../constants";

export class Database {
  private pool: sql.Pool;

  constructor() {
    this.pool = sql.createPool({
      connectionLimit: 100,
      host: constants.SQL_SERVER,
      user: constants.SQL_USER,
      database: constants.SQL_DATABASE,
      password: constants.SQL_PASSWORD,
    });
  }
  async executeQueryAsync(query: string) {
    return await this.pool.query(query);
  }
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async executeParamsQueryAsync(query: string, params: any[]) {
    return await this.pool.query(query, params);
  }
}

const database = new Database();
export default database;