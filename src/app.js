import express from "express";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import swaggerUi from "swagger-ui-express";
import specs from "./docs"
import userRoute from "./routes/user";
import swaggerUi from "swagger-ui-express";
import specs from "./docs"
dotenv.config();

const app = express();


if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

app.use('/user', userRoute);

app.use(express.json());
app.use(cors());
app.use('/docs', swaggerUi.serve, swaggerUi.setup(specs));
app.get("/", (req, res) => {
  res.send("Hello, There! this is Amigos ecommerce team project.");
});

export default app;
