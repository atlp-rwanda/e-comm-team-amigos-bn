import validateProductInput, {
    validateProductUpdate,
} from '../../validations/product.validator';
import express from 'express';
import {
  addProduct,
  getAllProduct,
  getProduct,
  getAvailableProducts,
  updateProductAvailability,
  getAllForSeller,
  checkExpiredProducts,
  searchProduct,
  updateProduct,
  deleteProduct
} from '../../controllers/product.controller';

import { authorize, verifyToken } from '../../middleware/verifyToken';

const router = express.Router();

router.post(
    '/create',
    validateProductInput,
    verifyToken,
    authorize(['Merchant']),
    addProduct
);
router.get('/', getAllProduct);
router.get('/collection', getAllForSeller);
router.get('/check-expired-products', checkExpiredProducts);

router.get('/availableProduct', getAvailableProducts);

router.put('/availableProduct/:id', updateProductAvailability);
router.get('/search', searchProduct);
router.get('/:id', verifyToken, getProduct);

router.patch(
    '/:id',
    verifyToken,
    authorize(['Merchant']),
    validateProductUpdate,
    updateProduct
);

router.delete('/delete/:id', verifyToken, authorize(['Merchant']), deleteProduct);

export default router;
