import express from 'express';
import {
    createCart,
    viewCart,
    cleanUpCart,
    updateCart,
    deleteItemInCart,
} from '../controllers/cart.controller';
import { validateCartAdd, validateCartUpdate } from '../validations/cart.validator';
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
router.delete(
    '/delete-cart/:id',
    verifyToken,
    authorize(['Customer']),
    deleteItemInCart
);

// Update cart route
router.put('/updateCart/:id', verifyToken,validateCartUpdate, updateCart);

module.exports = router;
