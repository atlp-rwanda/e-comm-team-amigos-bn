import validateProductInput, {
    validateProductUpdate,
} from '../../validations/product.validator';
import express from 'express';
import {
    getAllProduct,
    addProductByAdmin,
    getProduct,
    updateProduct,
    deleteProduct} from '../../controllers/product.controller';

import { authorize, verifyToken } from '../../middleware/verifyToken';

const router = express.Router();

router.post(
    '/create/:sellerId',
    validateProductInput,
    verifyToken,
    authorize(['Admin']),
    addProductByAdmin
);
router.get('/',verifyToken,  authorize(['Admin']),getAllProduct);



router.get('/:id', verifyToken,  authorize(['Admin']),getProduct);

router.patch('/:id',verifyToken,authorize(['Admin']),validateProductUpdate,updateProduct
);

router.delete('/:id', verifyToken, authorize(['Admin']), deleteProduct);

export default router;
