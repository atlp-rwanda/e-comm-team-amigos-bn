import express from 'express';
import {
    createCart,
    viewCart,
    cleanUpCart,
    updateCart,
} from '../controllers/cart.controller';
import { validateCartAdd } from '../validations/cart.validator';
import { verifyToken, authorize } from '../middleware/verifyToken';

const router = express.Router();

router.post('/', verifyToken, validateCartAdd, createCart);
router.get('/view-cart', verifyToken, viewCart);
router.delete(
    '/clean-up-cart',
    verifyToken,
    authorize(['Customer']),
    cleanUpCart
);

// Update cart route
router.put('/updateCart/:id', verifyToken, updateCart);

module.exports = router;
