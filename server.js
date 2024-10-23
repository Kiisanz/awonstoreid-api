import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import config from "./app/config/app.conf.js";
import initDatabase from "./app/database/init.js";
import appRoutes from "./app/routes/App.routes.js";
import errorHandler from "./app/middleware/ErrorHandler.middleware.js";
import responseHandler from "./app/middleware/SuccessHandler.middleare.js";

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/images", express.static("public/images"));

app.use(responseHandler);
app.use(config.apiPrefix, appRoutes);
app.use(errorHandler);

const PORT = config.port;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

initDatabase();
