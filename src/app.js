import express from "express";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";

dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, There! this is Amigos ecommerce team project.");
});

export default app;
