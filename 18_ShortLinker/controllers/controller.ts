import { Request, Response } from "express";
import Repository  from "../database/repositories/baseRepository";
import db from "../database/db";

export const uploadData = async (req: Request, res: Response) => {
     const { link } = req.body;
    try {
      const condition = { link: link };
      const data = await Repository.Find_link(condition);
      let short;

      if (!data || data !== link) {
        await Repository.Add_link(link);
        short = await Repository.Create_short(link);
    } else {
        short = await Repository.Create_short(link);
    }

    res
    .status(200)
    .json({ Message: `Shortened link: ${short}`});

    } catch (err) {
      console.log(err);
      return res.status(500).send("Server error");
    }
  }