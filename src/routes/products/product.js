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
    deleteProduct,
    getProductsByCategory,
} from '../../controllers/product.controller';
import { authorize, verifyToken } from '../../middleware/verifyToken';
import { getSalesStats } from '../../controllers/statistics.controller';

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
router.delete(
    '/delete/:id',
    verifyToken,
    authorize(['Merchant']),
    deleteProduct
);
router.get('/sales/stats', verifyToken, authorize(['Merchant']), getSalesStats);
router.post('/category/:category', getProductsByCategory);

export default router;
