import express from "express";
import { createCart, viewCart, cleanUpCart } from "../controllers/cart.controller";
import { validateCartAdd } from "../validations/cart.validator";
import {verifyToken} from '../middleware/verifyToken';

const router = express.Router();

router.post("/", validateCartAdd, createCart);
router.get('/view-cart', verifyToken, viewCart);
router.delete('/clean-up-cart', cleanUpCart);

export default router;