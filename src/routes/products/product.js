import express from "express";
import {
  addProduct,
  getAllProduct,
  getAvailableProducts,
  updateProductAvailability
} from "../../controllers/product.controller";
import validateProductInput from "../../validations/product.validator";

const router = express.Router();
router.post("/create", validateProductInput, addProduct);
router.get("/getAllItems", getAllProduct);
router.get("/create", (req, res) => {
  res.json({ message: "You are on product page" });
});
router.get('/availableProduct', getAvailableProducts);

router.put('/availableProduct/:id', updateProductAvailability);

export default router;