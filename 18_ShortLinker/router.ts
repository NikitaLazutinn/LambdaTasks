import Router from "express";
import {uploadData} from "./controllers/controller";
import Repository  from "./database/repositories/baseRepository";

const defaultRouter = Router();

defaultRouter.post("/link", uploadData);

defaultRouter.get("/shortlink/:id", async (req, res) => {
    const id = req.params.id;
    const condition = { Id: id };
    const redirectUrl = await Repository.Find_link(condition);

    res.redirect(redirectUrl);
});

export default defaultRouter;