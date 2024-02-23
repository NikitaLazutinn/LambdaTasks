import knex from 'knex';
import constants from "../constants";

export class Database {
    public db;
    constructor() {
      this.db = knex({
        client: 'mysql2',
        connection: {
          host: constants.SQL_SERVER,
          user: constants.SQL_USER,
          database: constants.SQL_DATABASE,
          password: constants.SQL_PASSWORD
        }
      });
    }
  }
  
  const database = new Database();
  export default database;