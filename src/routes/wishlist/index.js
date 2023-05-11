import express from "express";
import { addToWishlist, removeFromWishlist, showWishlist } from "../../controllers/wishlist.controller";
import { verifyToken } from "../../middleware/verifyToken";

const router = express.Router();

router.post("/add/:id", verifyToken, addToWishlist);

router.delete("/remove/:id", verifyToken, removeFromWishlist);

router.get("/all", verifyToken, showWishlist);



export default router;