import express from "express";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import specs from "./docs";
import routes from "./routes";
import db from "./database/models";

dotenv.config();

const app = express();
app.use(express.json());

if (process.env.NODE_ENV === 'development') {
  app.use(logger('dev'));
}
const {sequelize} = db;
sequelize.authenticate();

app.use(cors());
app.use("/", routes);
app.use("/docs", swaggerUi.serve, swaggerUi.setup(specs));
app.get("/", (req, res) => {
  res.send("Hello, There! this is Amigos ecommerce team project.");
});

export default app;
