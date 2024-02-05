import { addCurrenciesToDb } from "./services/databaseInitializer";
import { updatePrices, deleteLegacyData } from "./services/cornTasks";
import express, { Express } from "express";
import constants from "./constants";
import bodyParser from "body-parser";
import defaultRouter from "./router";
import { handleError } from "./middleware/errorsMiddleware";

const app: Express = express();

app.use(bodyParser.json());
app.use("/", defaultRouter);
app.use(handleError);

addCurrenciesToDb();
updatePrices.start();
deleteLegacyData.start();

app.listen(constants.PORT, async () => {
  console.log(`Server started on port ${constants.PORT}`);
});