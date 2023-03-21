import express from 'express';
import cart from '../../controllers/cart'

const router = express.Router();

router.get('/add-cart', cart.addToCart);
router.get('/view-cart',cart.viewCart);

export default router;
