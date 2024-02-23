import  Database  from "../db";

export class BaseRepository{
   protected tableName: string;

  constructor(tableName: string) {
    this.tableName = tableName;
  }

  async Find_link(condition:object){
   const data = await Database.db.select('link').from(this.tableName).where(condition);
   try{
    return data[0].link.toString();
   }catch{
    return null;
   }

  }


  async Add_link(link:string){
    try {
        await Database.db(this.tableName).insert({ link: link });

      } catch (error) {
          console.error("Error:", error);
      }
      
    }

    async Create_short(link:string){
    const id = await Database.db.select('Id').from(this.tableName).where('link', '=', link);
    const new_short = `http://localhost:3000/shortlink/${id[0].Id}`;
    return new_short;
    }

}


const Repository = new BaseRepository('Storage');
export default Repository;