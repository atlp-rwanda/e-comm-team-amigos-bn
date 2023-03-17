import express from "express";
import { addProduct, getAllProduct } from "../../controllers/product.controller";

const router = express.Router();

router.post("/create", addProduct);
router.get('/getAllItems',getAllProduct)
router.get("/create", (req,res)=>{
    res.json({message:"You are on product page"})
});
export default router;
