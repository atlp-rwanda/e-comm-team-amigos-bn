import express from "express";
import { createCart } from "../controllers/cart.controller";
import { validateCartAdd } from "../validations/cart.validator";

const router = express.Router();

router.get("/", validateCartAdd, createCart);




export default router;