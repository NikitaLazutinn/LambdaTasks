import express, { Express } from "express";
import constants from "./constants";
import bodyParser from "body-parser";
import defaultRouter from "./router";

const app: Express = express();

app.use(bodyParser.json());
app.use("/", defaultRouter);
app.listen(constants.PORT, async () => {
  console.log(`Server started on port ${constants.PORT}`);
});