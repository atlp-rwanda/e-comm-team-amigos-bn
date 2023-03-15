import validateProductInput, { validateProductUpdate } from '../../validations/product.validator';
import express from 'express';
import {
  addProduct,
  getAllProduct,
  getProduct,
  getAvailableProducts,
  updateProductAvailability,
  getAllForSeller,
  searchProduct,
  updateProduct,
} from '../../controllers/product.controller';

import { authorize, verifyToken } from '../../middleware/verifyToken';

const router = express.Router();

router.post('/create', validateProductInput, addProduct);
router.get('/getAllItems', getAllProduct);
router.get('/collection', getAllForSeller);

router.get('/availableProduct', getAvailableProducts);

router.put('/availableProduct/:id', updateProductAvailability);
router.get('/:id', verifyToken, getProduct);
router.get('/search', searchProduct);

router.patch('/:id', verifyToken, authorize(["vendor"]), validateProductUpdate, updateProduct);


export default router;
