<<<<<<< HEAD
import express from "express";
import logger from "morgan";
import dotenv from "dotenv";
import cors from "cors";
import userRoute from "./routes/user";
dotenv.config();

const app = express();

if (process.env.NODE_ENV === "development") {
  app.use(logger("dev"));
}

app.use('/user', userRoute);


app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello, There! this is Amigos ecommerce team project.");
});

export default app;
=======
class Cube {
    constructor(length) {
    this.length = length;
    }
    
    getSideLength () {
    return this.length;
    }
    
    getSurfaceArea () {
    return (this.length * this.length) * 6;
    }
    
    getVolume () {
    return Math.pow(this.length,3);
    }
    }
    
    module.exports = {
    Cube:Cube
    }
>>>>>>> 7c7fd8c (chore(unit testing):setup of unit testing by mocha and chai)
