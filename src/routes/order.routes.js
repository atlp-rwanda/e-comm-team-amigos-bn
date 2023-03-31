import express from 'express';

import {
    createOrder,
    deleteOrder,
    getOrders,
    updateOrder,
} from '../controllers/order.controller';
import { verifyToken, authorize } from '../middleware/verifyToken';

const router = express.Router();

router.post('/', verifyToken, authorize(['normal']), createOrder);
router.get('/', verifyToken, getOrders);
router.delete('/:id', verifyToken, authorize(['normal']), deleteOrder);
router.put('/:id', verifyToken, authorize(['normal']), updateOrder);

module.exports = router;
