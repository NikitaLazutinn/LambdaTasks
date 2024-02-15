import { Database } from "../databaseConnection";
import  database  from "../db";

export abstract class BaseRepository<T extends object> {
  protected tableName: string;
  protected db: Database;
  constructor(tableName: string, databse: Database) {
    this.tableName = tableName;
    this.db = databse;
  }
  async createTable(){
    return await this.db.executeQueryAsync(
      `CREATE TABLE ${this.tableName} (
        Id VARCHAR(50) PRIMARY KEY,
        CurrencyCode VARCHAR(50),
        CurrencyName VARCHAR(50),
        CoinPapricaId VARCHAR(50)
    );`
    );
  }

  async getAllAsync(): Promise<T[]> {
    const [rows] = await this.db.executeQueryAsync(
      `SELECT * FROM ${this.tableName}`
    );
    return Object.values(JSON.parse(JSON.stringify(rows)));
  }
  
  async getByIdAsync(id: string | number) {
    if (typeof id === "string") {
      const [rows] = await this.db.executeQueryAsync(
        `SELECT * FROM ${this.tableName} WHERE Id = '${id}'`
      );
      return rows;
    }
    const [rows] = await this.db.executeQueryAsync(
      `SELECT * FROM ${this.tableName} WHERE Id = ${id}`
    );
    return rows;
  }
  async addNewAsync(model: T) {
    const keys = Object.keys(model);
    const values = Object.values(model);
    await this.db.executeParamsQueryAsync(
      `INSERT INTO ${this.tableName}(${keys.toString()}) VALUES (?)`,
      [values]
    );
  }
  async addManyAsync(insertData: T[]) {
    const values = insertData.map((value) => Object.values(value));
    const keys = Object.keys(insertData[0]);
    await this.db.executeParamsQueryAsync(
      `INSERT INTO ${this.tableName}(${keys.toString()}) VALUES ?`,
      [values]
    );
  }
  async deleteByIdAsync(id: string | number) {
    if (typeof id === "string") {
      await this.db.executeQueryAsync(
        `DELETE FROM ${this.tableName} WHERE Id = '${id}'`
      );
      return;
    }
    await this.db.executeQueryAsync(
      `DELETE FROM ${this.tableName} WHERE Id = ${id}`
    );
  }
  async updateAsync(entity: T, id: string) {
    await this.deleteByIdAsync(id);
    await this.addNewAsync(entity);
    return;
  }
}